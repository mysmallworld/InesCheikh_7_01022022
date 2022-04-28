//Importing fs to manage file
const fs = require('fs');
//Importing bcrypt to hash the password
const bcrypt = require('bcrypt');
//Importing crypto-js to encrypt email
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
//Importing the package to use environment variables
const dotenv = require('dotenv');
const result = dotenv.config();
//Importing models
const model = require('../models');

//Function encrypt email
const encryptEmail = email => {

    const pass = process.env.CRYPTOJS_KEY;
    const key = CryptoJS.enc.Utf8.parse(pass);

    const encrypted = CryptoJS.AES.encrypt(email, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
}

//Function decrypt email
const decryptEmail = string => {

    const pass = process.env.CRYPTOJS_KEY;
    const key = CryptoJS.enc.Utf8.parse(pass);

    const decrypted = CryptoJS.AES.decrypt(string, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

//Function to register a new user
exports.signup = async (req, res) => {

    console.log(JSON.stringify(req.body));
    const emailCryptoJs = encryptEmail(req.body.email);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let avatar = `${req.protocol}://${req.get('host')}/images/avatar.png`;
    bcrypt.hash(req.body.password, 10).then(hash => {

        console.log("hash", hash);
        model.User.create({
            firstname: firstname,
            lastname: lastname,
            avatar: avatar,
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

    const emailCryptoJs = encryptEmail(req.body.email);
    const user = await model.User.findOne({
        where: { email: emailCryptoJs }
    });
    if (user) {
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (valid) {
            token = jwt.sign({ "id": user.id, "email": user.email, "firstname": user.firstname, "lastname": user.lastname, "admin": user.admin }, process.env.RANDOM_TOKEN_SECRET), { expireIn: '24h' };
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

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.id;
    const admin = decodedToken.admin;

    model.User.findOne({
        where: { id: userId },
        attributes: ["id", "firstname", "lastname", "avatar", "bio", "email", "admin", "createdAt"],
    })
        .then((user) => {
            if (user) {
                res
                    .status(200)
                    .json({ message: "Utilisateur trouvé !", user: { avatar: user.avatar, firstname: user.firstname, lastname: user.lastname, email: decryptEmail(user.email), bio: user.bio } });
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
    const userId = decodedToken.id;
    const admin = decodedToken.admin;

    console.log(JSON.stringify(req.body));
    model.User.findOne({
        where: { id: req.params.id }
    })
        .then(user => {
            console.log(admin);
            console.log(user.id + "/" + userId);
            if (admin || user.id == userId) {

                let avatar = user.avatar;
                if (req.file != undefined) {
                    avatar = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                const userObject = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    avatar: avatar,
                    bio: req.body.bio,
                    email: user.email,
                    password: user.password,
                    admin: user.admin
                }

                model.User.update(userObject, { where: { id: req.params.id } })
                    .then(() => {
                        res.status(200).json({ message: "L'utilisateur a bien été mis à jour !", firstname: userObject.firstname, lastname: userObject.lastname, bio: userObject.bio })
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
    const userId = decodedToken.id;
    const admin = decodedToken.admin;

    model.User.findOne({
        where: { id: req.params.id },
    })
        .then((user) => {
            if (admin || user.id == userId) {

                if (user.avatar) {
                    const filename = user.avatar.split('/images/')[1];
                    if (filename !== "avatar.png") {
                        fs.unlink(`images/${filename}`, () => {
                            console.log("image supprimée");

                        });
                    }
                    user.destroy()
                        .then(() => {
                            res.status(200).json({ message: "L'utilisateur a bien été supprimé !" })
                        })
                        .catch((error) => {
                            res.status(400).json({ message: "L'utilisateur n'a pas été supprimé !" })
                        });

                }

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