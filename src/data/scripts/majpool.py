import pandas as pd, sqlite3, requests
import numpy as np
from datetime import date, timedelta, datetime

conn = sqlite3.connect('C:/Users/huber/OneDrive/NHL/DbMatchs.db')
fin = " WHERE EVENT = 'GOAL' AND Period <> '5' AND PBP.Date >= ALIGNEMENTS.dateDebut AND PBP.Date <= ALIGNEMENTS.dateFin AND PBP.Date >= '2021-10-12' GROUP BY idAlignement)) WHERE idAlignement = ALIGNEMENTS.idAlignement)"

def execSQL(sql, conn, write=False):
    c = conn.cursor()
    print(c.execute(sql))
    if write:
        conn.commit()
    else:
        print(c.fetchall())
    c.close()

def writeUpdateDebut(typeScore):
    updateDebut = "UPDATE ALIGNEMENTS SET " + typeScore + "Actuels = (SELECT Nb" + typeScore + " FROM ((SELECT idAlignement, COUNT(Event) AS Nb" + typeScore + " FROM PBP INNER JOIN ALIGNEMENTS ON"
    return updateDebut
    
def majInterne(typeScore):
    debut = writeUpdateDebut(typeScore)
    if typeScore == "buts":
        milieu = " (PBP.p1_ID = ALIGNEMENTS.idNHL)"
    elif typeScore == "assist":
        milieu = " (PBP.p2_ID = ALIGNEMENTS.idNHL) OR (PBP.p3_ID = ALIGNEMENTS.idNHL)"
    sqlUpdate = debut + milieu + fin
    execSQL(sqlUpdate, conn, write = True)

def writeSetZero(typeScore):
    setZero = "UPDATE ALIGNEMENTS SET " + typeScore + "Actuels = 0 WHERE " + typeScore + "Actuels IS NULL"
    return setZero

def majPointsAlignements():
    setButsZero = writeSetZero("buts")
    setAssistZero = writeSetZero("assist")
    setPtsZero = writeSetZero("points")
    sqlUpdate = "UPDATE ALIGNEMENTS SET pointsActuels = (butsActuels + assistActuels)"
    execSQL(setButsZero, conn, write = True)
    execSQL(setAssistZero, conn, write = True)
    execSQL(setPtsZero, conn, write = True)
    execSQL(sqlUpdate, conn, write = True)

def majPJ():
    sqlUpdate = "UPDATE ALIGNEMENTS SET pjActuels = (SELECT NbPJ FROM (SELECT idAlignement, COUNT(DISTINCT Game_Id) AS NbPJ FROM SHIFTS INNER JOIN ALIGNEMENTS ON (SHIFTS.Player_Id = ALIGNEMENTS.idNHL) AND SHIFTS.Date >= ALIGNEMENTS.dateDebut AND SHIFTS.Date <= ALIGNEMENTS.dateFin AND SHIFTS.Date >= '2021-01-13' GROUP BY idAlignement) WHERE idAlignement = ALIGNEMENTS.idAlignement)"
    updateNull = "UPDATE ALIGNEMENTS SET pjActuels = 0 WHERE pjActuels IS NULL"
    execSQL(sqlUpdate, conn, write = True)
    execSQL(updateNull, conn, write = True)

def majPJBPPAlign():
    majInterne("buts")
    majInterne("assist")
    majPointsAlignements()
    majPJ()

def majScorePoolers():
    sqlUpdate = "UPDATE POOLERS SET PJ = (SELECT NbPJ FROM (SELECT idPooler, SUM(pjActuels) AS NbPJ FROM ALIGNEMENTS WHERE statutJoueur = 'Alignement' GROUP BY idPooler) WHERE Id = idPooler), B = (SELECT NbB FROM (SELECT idPooler, SUM(butsActuels) AS NbB FROM ALIGNEMENTS WHERE statutJoueur = 'Alignement' GROUP BY idPooler) WHERE Id = idPooler), A = (SELECT NbA FROM (SELECT idPooler, SUM(assistActuels) AS NbA FROM ALIGNEMENTS WHERE statutJoueur = 'Alignement' GROUP BY idPooler) WHERE Id = idPooler), Score = (SELECT NbSc FROM (SELECT idPooler, SUM(pointsActuels) AS NbSc FROM ALIGNEMENTS WHERE statutJoueur = 'Alignement' GROUP BY idPooler) WHERE Id = idPooler)"
    execSQL(sqlUpdate, conn, write = True)
    
#maj du score des gardiens
def logGardien(idNHL):
    jsonJoueur = requests.get("https://statsapi.web.nhl.com/api/v1/people/" + idNHL + "/stats?stats=gameLog&season=20202021").json()
    df = pd.json_normalize(jsonJoueur["stats"][0]["splits"])
    gardienLogs = df[["season", "date", "isWin", "stat.shutouts"]]
    gardienLogs["gardien"] = idNHL
    return gardienLogs

def GwriteUpdate(typeScore):
    colAl = ""
    if typeScore == "isWin":
        colAl = "buts"
    elif typeScore == "'stat.shutouts'":
        colAl = "assist"
    elif typeScore == "scorePool":
        colAl = "points"
    debut = "UPDATE ALIGNEMENTS SET " + colAl + "Actuels = (SELECT Nb FROM (SELECT gardien, SUM(" + typeScore + ") AS Nb FROM GARDIENS WHERE dateMatch >= ALIGNEMENTS.dateDebut AND dateMatch <= ALIGNEMENTS.dateFin AND gardien = ALIGNEMENTS.idNHL)) WHERE ALIGNEMENTS.idNHL IN (SELECT DISTINCT(gardien) FROM GARDIENS)"
    return debut

def majScoreGardiens():
    dfGardiens = pd.read_sql("SELECT idNHL FROM JOUEURS WHERE position == 'G'", conn)
    gardiens = dfGardiens["idNHL"].apply(str)
    listGardiens = gardiens.values.tolist()

    vraisCol = ["season", "date", "isWin", "stat.shutouts", "gardien"]
    gameLogsG = pd.DataFrame(columns=vraisCol)
    gameLogsG = gameLogsG.fillna(0)

    for i in listGardiens:
        try:
            gardienLogs = logGardien(i)
        except:
            print("fausse alarme (espoir) " + i)
        gameLogsG = gameLogsG.append(gardienLogs)
    gameLogsG = gameLogsG.rename(columns = {"date" : "dateMatch"})
    gameLogsG[["dateMatch"]] = gameLogsG.dateMatch.str.split(" 00:",expand=True)
    #gameLogsG["dateMatch"] = pd.to_datetime(gameLogsG["dateMatch"])
    pbpDates = pd.read_sql("SELECT MAX(Date) FROM PBP", conn)
    maxDate = pbpDates.iloc[0]["MAX(Date)"]
    gameLogsG = gameLogsG[(gameLogsG["dateMatch"] <= maxDate)]
    
    a = gameLogsG["isWin"]
    gameLogsG["esWin"] = a * 2
    gameLogsG ["scorePool"] = gameLogsG["esWin"] + gameLogsG["stat.shutouts"]
    gameLogsG.to_sql("GARDIENS", conn, if_exists="replace", index=False)

    updVic = GwriteUpdate("isWin")
    updJB = GwriteUpdate("'stat.shutouts'")
    updSco = GwriteUpdate("scorePool")
    execSQL(updVic, conn, write = True)
    execSQL(updJB, conn, write = True)
    execSQL(updSco, conn, write = True)

#majMasseSalariale()
def majMasseSalariale():
    sqlUpdate = "UPDATE POOLERS SET MasseSalariale = (SELECT masseActuelle FROM (SELECT idPooler, SUM(salaireActuel) AS masseActuelle FROM ALIGNEMENTS INNER JOIN JOUEURS ON ALIGNEMENTS.idNHL = JOUEURS.idNHL WHERE date('now') BETWEEN ALIGNEMENTS.dateDebut AND ALIGNEMENTS.dateFin AND (statutJoueur = 'Alignement' OR statutJoueur = 'Réserve' OR statutJoueur = 'RetenuSalaire') GROUP BY idPooler) WHERE Poolers.Id = idPooler)"
    execSQL(sqlUpdate, conn, write = True)

#maj des json
def majTables():
    conn = sqlite3.connect('C:/Users/huber/OneDrive/NHL/DbMatchs.db')
    var = 'OK'
    try:
        #maj Poolers
        dfPoolers = pd.read_sql("SELECT * FROM POOLERS", conn)
        jsonPoolers = dfPoolers.to_json("C:/dev/pool-de-hockey/src/data/poolers.json", orient = "table", index =    False, indent = 4)
    except Exception as ex:
        print("Erreur : poolers")
        var = "Erreur poolers"

    try:
        #maj Alignements
        requete = "SELECT * FROM ALIGNEMENTS INNER JOIN JOUEURS ON JOUEURS.idNHL = ALIGNEMENTS.idNHL"
        dfTempo = pd.read_sql(requete, conn)
        dfAlignements = dfTempo.T.drop_duplicates().T
        jsonAlignements = dfAlignements.to_json("C:/dev/pool-de-hockey/src/data/alignements.json", orient = "table", index = False, indent = 4)
    except Exception as ex2:
        print("Erreur : alignements")
        var = "Erreur alignements"

    try:
        #maj Picks
        dfPicks = pd.read_sql("SELECT * FROM DRAFT", conn)
        jsonPicks = dfPicks.to_json("C:/dev/pool-de-hockey/src/data/picks.json", orient = "table", index = False, indent = 4)
    except Exception as ex2:
        print("Erreur : picks")
        var = "Erreur picks"

    try:
        #maj Joueurs
        dfJoueurs = pd.read_sql("SELECT * FROM JOUEURS", conn)
        jsonJoueurs = dfJoueurs.to_json("C:/dev/pool-de-hockey/src/data/joueurs.json", orient = "table", index = False, indent = 4)
    except Exception as ex3:
        print("Erreur : joueurs")
        var = "Erreur joueurs"

    return var



majPJBPPAlign()
print("Maj par joueur")
majScoreGardiens()
print("Maj score gardiens")
majScorePoolers()
print("Maj par pooler")
majMasseSalariale()
print("Maj masse salariale")
majTables()
print("Maj jsons")