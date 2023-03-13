#!bin/sh
cd ~/pool-de-hockey
git add --all
timestamp() {
    date +"à %H:%M:%S le %Y-%m-%d"
}
git commit -am "Maj automatique $(timestamp)"
git push origin master

