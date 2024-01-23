# Comment mettre à jour le site manuellement

## Horaire normal

* 3h le scraping des données de la LNH se fait (CRON sur lambda scrpDate)
* 3h30 les stats se mettent à jour via des reuêtes Athena et génération des 4 fichiers json (CRON sur lambda majPool)
* 4h le GitHub Action de ce repo télécharge les 4 json et les commit dans ce repo, ce qui déclenche le build automatique sur Netlify

## Déclenchement manuel

Si on veut màj le pool, par exemple suite à des échanges, on doit exécuter les 2e et 3e étapes ci-haut manuellement.

### 1 - déclencher la lambda majPool:

https://zjzvhtdq0m.execute-api.ca-central-1.amazonaws.com/Prod/majpool

Ceci peut être automatisé via la commande:

```
curl -X GET https://zjzvhtdq0m.execute-api.ca-central-1.amazonaws.com/Prod/majpool
```

La lambda retourne un timeout mais ça fonctionne quand même. Au bout de quelques minutes, les 4 json suivants seront à jour:
```
https://dj15141xisgt0.cloudfront.net/json/poolers.json
https://dj15141xisgt0.cloudfront.net/json/alignements.json
https://dj15141xisgt0.cloudfront.net/json/picks.json
https://dj15141xisgt0.cloudfront.net/json/joueurs.json
```
Pour confirmer la fin de la lambda, il faut regarder dans AWS Cloudwatch dans le logGroup de majPool:

https://ca-central-1.console.aws.amazon.com/cloudwatch/home?region=ca-central-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Fnhl-scraper-MajPoolFunction-iVrYdOv8NFNf

### 2 - faire un commit des 4 json dans ce repo

Dnas un checkout à jour local de ce repo, télécharger les 4 json ci-haut dans 

```./src/data/```

Et committer. Ceci va déclencher la compilation et le déploiement du site dans Netlify. Au bout d'une minute, le pool sera à jour.
