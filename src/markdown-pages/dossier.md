---
slug: "/dossier"
date: "2019-05-04"
title: "Utilisation du dossier de projet"
---

Le dossier de projet contiendra tout ce qui est nécessaire pour que le site fonctionne. On va même y mettre les notebooks Jupyter, et la BD. Par contre, la BD étant trop grosse, on ne va pas la synchroniser. Donc, il va falloir écrire du code pour extraire de la BD les données intéressantes dans des fichiers .json qui eux seront légers.

## Création initiale du dossier de projet

GitHub sera utilisé pour synchroniser le projet (pas OneDrive). Donc, il faut initialement créer un dossier local qui clone le "repository" de GitHub. 

L'adresse de notre repo GitHub est: https://github.com/ActarusC/pool-de-hockey

Donc, dans une console (CMD prompt), dans un dossier en-dehors de OneDrive, par exemple `c:\dev`, exécuter cette commande :

```
c:\dev>git clone https://github.com/ActarusC/pool-de-hockey pool-de-hockey
```

Cette commande crée une copie locale des fichiers du projet dans le dossier `pool-de-hockey`. Toutes les commandes devront y être exécutées par la suite. Donc :

```
c:\dev>cd pool-de-hockey
c:\dev\pool-de-hockey>
```
### Visual Studio
```
c:\dev\pool-de-hockey>code .
```
Cette commande va démarrer Visual Studio Code dans le dossier de projet, et permetter d'utiliser Visual Studio Code pour modifier le contenu du projet.

### Serveur local
(nécessite d'avoir NodeJS d'installé)
```
c:\dev\pool-de-hockey>npm install
```
Cette commande va installer tous les modules NodeJS pour faire fonctionner le site en local sur l'ordi. Nécessaire juste la première fois.

Une fois le `npm install` terminé, exécuter cette commande:

```
c:\dev\pool-de-hockey>gatsby develop
```

va faire fonctionner le site en local. Il sera alors accessible à l'adresse suivante:

http://localhost:8000/

Tout changement au code qui sera alors fait sera réflété dans le fureteur.

Pour tester si ça fonctionne, aller sur [http://localhost:8000/poolers]. Puis, avec Visual Studio Code ou notepad, modifier le fichier `pool-de-hockey/src/data/poolers.json` et changer un score. Dès la sauvegarde, le nouveau score devrait être visible dans le fureteur.