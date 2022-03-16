const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

const model = require('../models');

exports.createPost = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const imageURL = `${req.protocol}://${req.get('host')}/images/avatar.png`;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;

    model.User.findOne({
        where: { id: req.params.id }
    })
        .then(user => {
            if (admin || user.id == userId) {

                const postObject = {
                    userId: id,
                    title: title,
                    content: content,
                    imageURL: imageURL,
                }
    model.Post.create(postObject , { where: { id: req.params.id } })}})
    .then(res => { res.status(201).json({ message: "Le post a bien été créé !" }) })
    .catch(error => {
        console.log(error)
        return res.status(500).json({ message: error.message })
    });
};

exports.getOnePost = async (req, res) => {
    model.Post.findOne({
        attributes: ["id", "title", "content", "imageURL", "userId", "createdAt"],
    })
        .then((post) => {
            if (post) {
                res.status(200).json({ message: "Post trouvé !", post });
            } else {
                return res.status(404).json({ message: "Post introuvable !" });
            }
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({ message: error.message });
        });
};

exports.getAllPost = async (req, res) => {
    model.Post.findAll({
        attributes: ["id", "title", "content", "imageURL", "createdAt"],
    })
        .then((posts) => {
            if (posts) {
                res.status(200).json({ message: "Posts trouvés !", posts });
            } else {
                return res.status(404).json({ message: "Posts introuvables !" });
            }
        })
        .catch((error) => {
            console.error(error.message);
            return res.status(500).json({ message: error.message });
        });
};

exports.updatePost = async (req, res) => {

};

exports.deletePost = async (req, res) => {

};