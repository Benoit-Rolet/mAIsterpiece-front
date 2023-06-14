# mAIsterpiece - Front End

## Installation Guide

1. Download all the files and directories above on your workspace

2. Install all the dependencies with yarn
```
yarn
```
3. Modify the file src/utils/url.example.js into url.js
```
mv url.example.js url.js
```
and, in this file, write down your server domain, without the final '/'
### DEVELOPMENT
4. Start the server with yarn
```
yarn start
```
and go to http://localhost:8080/


### PRODUCTION
4. Build the project
```
yarn build
```
5. Go to the "dist" directory
```
cd dist
```
6. Export all the directories and files from "dist" to your production server

Enjoy !

## Guide d'installation

1. Télécharger tous les fichiers et dossiers ci-dessus dans votre espace de travail

2. Installer toutes les dépendances avec yarn
```
yarn
```
3. Transformer le fichier src/utils/url.example.js en url.js
```
mv url.example.js url.js
```
et dans ce fichier, remplacer 'http://your-domain.com' par le nom de domaine de votre serveur, sans le '/' final.
### DEVELOPPEMENT
4. Démarrer le serveur avec yarn
```
yarn start
```
et rendez-vous sur http://localhost:8080/


### PRODUCTION
4. Compiler le projet
```
yarn build
```
5. Aller sur le répertoire "dist"
```
cd dist
```
6. Exporter tous les fichiers et dossiers présents de ce répertoire vers votre serveur de production 

Amusez-vous !

## Dependencies / Dépendances
    "axios": "1.4.0",
    "prop-types": "15.8.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-dropzone": "14.2.3",
    "react-feather": "2.0.10",
    "react-redux": "8.0.5",
    "react-router-dom": "6.11.1",
    "redux": "4.2.1",
    "redux-devtools-extension": "2.13.9",
    "swiper": "9.3.2"
