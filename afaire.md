---
slug: "/afaire"
date: "2019-05-04"
title: "À faire"
---
Liste de ce qu'il reste à bâtir pour le pool.

# Base de données

Ajouter tables pour
* ~~*Poolers*~~

    ~~Contient les poolers, leur score, toute info liée~~

    ~~Champs:~~
    * ~~id, string, genre gab, clem, hub~~
    * ~~nom, string, Gabriel, Clément, Hubert~~
    * ~~score, int~~
* ~~*Joueurs*~~

    ~~Contient les joueurs de la LNH et leur info actuelle~~

    ~~Champs~~
    * ~~idNHL~~
    * ~~idHockeyReference~~
    * ~~id autres sites si pertinent~~
    * ~~Nom~~
    * ~~Prénom~~
    * ~~Équipe actuelle~~
    * ~~Salaire actuel~~
    * ~~...~~

* ~~*Alignements*~~

    ~~Contient les associations entre les joueurs et les poolers, avec historique~~

    ~~Champs~~
    * ~~id~~
    * ~~idPooler string, correspond au champ id de Poolers~~
    * ~~idNHL, correspond au champ idNHL de Joueurs. Ce champ ne doit pas être unique car un joueur peut être aligné avec une nouveau Pooler~~
    * ~~dateDebut, datetime, identifie le début de l'association entre ce joueur et ce pooler.~~
    * ~~dateFin, datetime, identifie la fin de l'association entre ce joueur et ce pooler.~~
    * ~~pointsActuels, valeur par défaut à 0. Ce champ sera mis à jour régulièrement pour contenir les points du joueur LNH qui contribuent au score du pooler. Valide uniquement pour la saison en cours.~~

        *~~NOTE HUBERT~~* ~~: la table Alignements va contenir seulement les joueurs actifs. Les espoirs et les joueurs de la réserve seront dans une autre table.~~
        *~~NOTE PIERRE~~* ~~: non non. le mieux est d'ajouter un champ status, avec des valeurs comme "Actif", "Réserve", "Libéré", "Blessé" mais dans ces table, et de filtrer en code ou en requête SQL. C'est ça le principe des base de données SQL.~~


    NOTES:

    * Pour les champs datetime, on va mettre l'heure à midi, comme ça on n'aura pas à gosser avec les fuseaux horaires, et ça va fonctionner même pour les matchs dans l'ouest qui finissent après minuit.
    * Pour le moment, on ne va traiter les changements que dans la saison actuelle


(test pour 1 commit)

# Code Python (Jupyter Lab)

Ajouter la bd avec le contenu scrapé des play by play de NHL API dans le dossier /src/data du projet. Les fichiers *.bd sont exclus de git.

Déplacer les fichiers notebook pertinents (ficheirs *.ipynb) dans le dossier. On peut créer un dossier notebooks dans /src.

Pour lancer Jupyter Lab, il faut être dans le dossier du projet et lancer la commande `jupyter lab` de là :

```
C:\dev\pool-de-hockey>jupyter lab
```

## Code Python à faire
En gros, on résume le projet, il faudra:
* mettre à jour la table des play by play - avec le code de scraping de Hub qui existe déjà
* pour chaque joueur NHL actif dans un aligement, aller chercher le nombre de points de la saison en cours depuis la date de début de l'alignement et màj le champ pointsActuel de la table Alignement
* mettre à jour la table Poolers avec la somme des points actuels de la table des alignements
* exporter la table Poolers en json
* exporter la table Alignements en json
* exporter la table Joueurs en json, en filtrant que pour les joueurs qui existent dans Alignements
* updater le repo Github avec les 3 json à jour

## Code React / Javascript à faire
* Afficher à la une le tableau à jour des poolers
* Créer une page pour chaque pooler, où on pourra voir chacun des alignements et ajouter hyperlien dans tableau des pooler pour se rendre ici
* Créer une page pour chaque joueur, en créant des hyperliens vers NHL et HockeyRef et autres
* Voir si on peut ajouter image en paramètre au composant image