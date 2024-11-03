# Bot Chart V2
## Description du projet
Il s'agit d'une variante du projet de [Top Chart Bot](https://github.com/3PeatVR/Bot-Chart-Public) utilisant des bases de données locales au lieu de faire des requêtes sur des sites externes pour obtenir la donnée à poster. Les bases de données sont créées en scrappant les sites de la V1. Comme la V1, le projet est codé en JavaScript.
Le projet n'est toujours pas fini, il faut à présent construire les bases de données, il faut compter environ une quinzaine de minutes pour scrapper une année. 
## Technologies utilisées
Ce sont les mêmes technologies que sur la V1, les bases de données sont au format JSON.
## Déploiement
Le scrapping se fait à l'aide du fichier ```main.js``` qui balaye une plage d'années, les dates de chaque année, et complète si des entrées sont manquantes dans les bases de données. On peut lancer (si la puissance de calcul le permet) ```main2.js``` qui est le même programme mais sur une plage d'années différente, pour compléter 2 années en même temps. Les programmes se lancent avec la commande ```npm <nom du programme>```.
## Ce qu'il reste à faire pour rendre le bot opérationnel
* Finir de compléter toutes les années (et si possible rajouter des pays absents de la V1)
* Mettre en place un script JavaScript permettant de sélectionner la donnée dans la base de données, puis la poster sur X.
* Déployer le bot sur [Render](https://render.com) comme la V1 à l'aide d'un container Docker
