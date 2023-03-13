Set-Location /dev/pool-de-hockey/src/data/scripts
python .\scrape.py
python .\majpool.py

Set-Location /dev/pool-de-hockey
$date = (get-date)
#git checkout master
git pull
git add --all
git commit -m "Maj automatique $date"
git push

