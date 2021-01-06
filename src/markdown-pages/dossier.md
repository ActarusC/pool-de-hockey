---
slug: "/dossier"
date: "2019-05-04"
title: "Utilisation du dossier de projet"
---

## Création initiale du dossier de projet

GitHub sera utilisé pour synchroniser le projet (pas OneDrive). Donc, il faut initialement créer un dossier local qui clone le "repository" de GitHub. 

L'adresse de notre repo GitHub est: https://github.com/ActarusC/pool-de-hockey

Donc, dans une console (CMD prompt), dans un dossier en-dehors de OneDrive, par exemple `c:\dev`, exécuter cette commande :

```
c:\dev>git clone https://github.com/ActarusC/pool-de-hockey pool-de-hockey
```

Cette commande crée une copie locale des fichiers du projet dans le dossier `pool=de=hockey`. Toutes les commandes devront y être exécutées par la suite. Donc :

```
c:\dev>cd pool-de-hockey
c:\dev\pool-de-hockey>
```
### Commandes utiles
```
c:\dev\pool-de-hockey>code .
```
Cette commande va démarrer Visual Studio Code dans le dossier de projet, et permetter d'utiliser Visual Studio Code pour modifier le contenu du projet.

de la doc