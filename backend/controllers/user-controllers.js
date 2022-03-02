//Importing bcrypt to hash the password
const bcrypt = require('bcrypt');
//Importing crypto-js to encrypt email
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');
//Importing the package to use environment variables
const dotenv = require('dotenv');
const result = dotenv.config();
//Importing models
const model = require('../models');

//Function to register a new user
exports.signup = async (req, res) => {

    console.log(JSON.stringify(req.body));
    const emailCryptoJs = cryptojs.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`).toString(cryptojs.enc.Base64);

    let username = req.body.username;
    bcrypt.hash(req.body.password, 10).then(hash => {

        console.log("hash", hash);
        model.User.create({
            username: username,
            email: emailCryptoJs,
            password: hash,
            admin: false,
        })
        .then(result => { res.status(201).json({ message: "L'utilisateur a bien été créé !" }) })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ message: error.message })
        });
    }).catch(error => {
        console.log(error)
        return res.status(500).json({ message: error.message })
    });
};

//Function to connect user existants
exports.login = async (req, res) => {

    const emailCryptoJs = cryptojs.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`).toString(cryptojs.enc.Base64);

    const user = await model.User.findOne({
        where: { email: emailCryptoJs }
    });
    if (user) {
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (valid) {
            token = jwt.sign({ "id": user.id, "email": user.email, "username": user.username, "admin": user.admin }, process.env.RANDOM_TOKEN_SECRET), { expireIn: '24h' };
            res.status(200).json({ message: "Utilisateur connecté !", "id": user.id, token });
        } else {
            res.status(400).json({ message: "Mot de passe incorrect !" });
        }
    } else {
        res.status(404).json({ message: "Utilisateur introuvable !" });
    }
};

//Function to presents all users
exports.getUser = (req, res) => {
    model.User.findAll({
        attributes: ["id", "username", "email", "admin", "createdAt"],
    })
        .then((users) => {
            if (users) {
                res
                    .status(200)
                    .json({ message: "Utilisateur trouvé !", users });
            } else {
                return res.status(404).json({ message: "Utilisateur introuvable !" });
            }
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({ message: error.message });
        });
};

//Function to update a user
exports.updateUser = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    const admin = decodedToken.admin;

    model.User.findOne({
        where: { id: req.params.id }
    })
        .then(user => {
            if (admin || user.id == userId) {
                const userObject = req.file ?
                    {
                        username: user.username
                    } :
                    {
                        ...req.body
                    };
                delete userObject.userId;
                model.User.update(userObject, { where: { id: req.params.id } })
                    .then(() => {
                        res.status(200).json({ message: "L'utilisateur a bien été mis à jour !", username: userObject.username })
                    })
                    .catch((error) => {
                        console.error(error.message);
                        return res.status(500).json({ message: error.message });
                    });
            }
            else {
                res.status(403).json({ message: "Action non autorisée !" })
            }
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({ message: error.message });
        });
};

//Function to delete a user
exports.deleteUser = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    const admin = decodedToken.admin;

    model.User.findOne({
        where: { id: req.params.id },
    })
        .then((user) => {
            if (admin || user.id == userId) {
                user.destroy()
                    .then(() => {
                        res.status(200).json({ message: "L'utilisateur a bien été supprimé !" })
                    }).catch((error) => {
                        res.status(400).json({ message: "L'utilisateur n'a pas été supprimé !" })
                    });
            }
            else {
                res.status(403).json({ message: "Action non autorisée !" })
            }
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({ message: error.message });
        });
};