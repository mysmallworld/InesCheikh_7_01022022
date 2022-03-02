//Importation de express
const express = require('express');
//Appel de la méthode express pour créer une application express
const app = express();
//Accès au chemin de notre système de fichier
const path= require('path');
//Enregistrement des routeurs
const userRoutes = require('./routes/user-routes');

//Importation des models
const { sequelize, User, Post } = require("./models");

//Mise en place des requête POST
app.use(express.json());

//Middleware appliqué à toutes les routes, ajout de headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Acccès au système de gestion de téléchargement de fichier image
app.use('/images', express.static(path.join(__dirname, 'images')));

//Enregistrement du routeur pour toutes les demandes effectuées
app.use('/api/auth', userRoutes);

//Exportation vers les autres fichiers pour l'accès d'express 
module.exports = app;