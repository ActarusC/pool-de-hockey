# Exemples de SQL utiles

La fonction GROUP BY permet de faire des aggrégations. Ici, on utilise COUNT pour compter le nombre de points des joueurs de l'alignement :

``` sql
SELECT idPooler, COUNT(Event) AS NbPTS FROM PBP
    INNER JOIN ALIGNEMENTS ON (PBP.p1_ID = ALIGNEMENTS.idNHL) OR (PBP.p2_ID = ALIGNEMENTS.idNHL)  OR (PBP.p3_ID = ALIGNEMENTS.idNHL)
WHERE EVENT = "GOAL" AND statutJoueur = "Alignement"
GROUP BY idPooler
```

Donc, un UPDATE de la table POOLER serait faisable avec le résultat de cette requête. Donc, on lit le réstulat de cette requete dans un pandas et on appele une fonction, en python,  qui met le champ Score à jour pour chaque joueur.

Une requête similaire pourrait être faite mais en groupant par Joueur. Un UPDATE de la table ALIGNEMENT serait ensuite fisable en lisant le réstulat de cette requete dans un pandas et on appele une fonction, en python,  qui met le champ PointsActuel à jour pour chaque joueur alignement actif.

Il resterait à filtrer plus la requête SQL pour n'inclure que les résultats de la saison en cours - là, on obtient les points de 2019-2020 pcq c'est ça qui a dans la BD

*NOTE HUBERT* : comment on intégre le date range là-dedans?



