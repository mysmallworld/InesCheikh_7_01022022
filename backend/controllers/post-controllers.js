//Importing fs to manage file
const fs = require('fs');
const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

const model = require('../models');

exports.createPost = async (req, res) => {

	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
	const userId = decodedToken.id;

	let imageUrl;
	try {
		const user = await model.User.findOne({
			attributes: ['firstName', 'lastName', 'id', 'avatar'],
			where: { id: userId }
		});

		if (user !== null) {
			if (req.file) {
				imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
			}

			const post = model.Post.create({
				include: [
					{
						model: model.User,
						attributes: ['firstname', 'lastname', 'id', 'avatar']
					}
				],
				content: req.body.content || '',
				title: req.body.title || '',
				imageURL: imageUrl || '',
				UserId: user.id
			})
				.then((response) => res.status(200).json({ "post": response, message: "Publication postée !" }))
				.catch(error => { res.status(500).json({ message: error.message }); });

		} else {
			res.status(404).json({ message: "Utilisateur introuvable !" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.getOnePost = async (req, res) => {
	model.Post.findOne({
		where: { id: req.params.id },
		attributes: ["id", "title", "content", "imageURL", "userId", "createdAt"],
		include: [{
			model: model.User,
			attributes: ["avatar", "lastname", "firstname"]
		},
		{
			model: model.Likes,
			attributes: [ 'postId', 'userId' ]
		},
		{
			model: model.Dislikes,
			attributes: [ 'postId', 'userId' ]
		},
		{
			model: model.Comment,

			attributes: ["id", "comment", "updatedAt", "createdAt", "UserId", "PostId"],
			include: [
				{
					model: model.User,
					attributes: ["avatar", "lastname", "firstname"]
				}
			]
		}
		]
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
		order: [['updatedAt', 'DESC']],
		attributes: ["id", "title", "content", "imageURL", "createdAt", "updatedAt"],
		include: [{
			model: model.User, attributes: ["avatar", "lastname", "firstname"]
		},
		{
			model: model.Likes,
			attributes: [ 'postId', 'userId' ]
		},
		{
			model: model.Dislikes,
			attributes: [ 'postId', 'userId' ]
		},
		{
			model: model.Comment,

			attributes: ["id", "comment",  "updatedAt", "createdAt", "UserId", "PostId"],
			include: [
				{
					model: model.User,
					attributes: ["avatar", "lastname", "firstname"]
				}
			]
		}
		],
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

exports.getMyPost = async (req, res) => {
	model.Post.findAll({
		where: { userId: req.params.id },
		order: [['updatedAt', 'DESC']],
		attributes: ["id", "title", "content", "imageURL", "createdAt", "updatedAt"],
		include: [{
			model: model.User, attributes: ["avatar", "lastname", "firstname"]
		},
		{
			model: model.Likes,
			attributes: [ 'postId', 'userId' ]
		},
		{
			model: model.Dislikes,
			attributes: [ 'postId', 'userId' ]
		},
		{
			model: model.Comment,

			attributes: ["id", "comment",  "updatedAt", "createdAt", "UserId", "PostId"],
			include: [
				{
					model: model.User,
					attributes: ["avatar", "lastname", "firstname"]
				}
			]
		}
		],
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
	try {
		let newImageUrl;
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
		const userId = decodedToken.id;

		let post = await model.Post.findOne({ where: { id: req.params.id } });
		console.log(post.userId);

		if (userId === post.userId) {

			if (req.file) {
				newImageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
				console.log(newImageUrl);
				if (post.imageUrl) {
					const filename = post.imageUrl.split('/images')[1];
					fs.unlink(`images/${filename}`, (err) => {
						if (err) console.log(err);
						else {
							console.log(`Deleted file: images/${filename}`);
						}
					});
				}
			}
			if (!req.file && req.body.deleteImage == "true") {
				newImageUrl = '';
				if (post.imageUrl) {
					const filename = post.imageUrl.split('/images')[1];
					fs.unlink(`images/${filename}`, (err) => {
						if (err) console.log(err);
						else {
							console.log(`Deleted file: images/${filename}`);
						}
					});
				}
			}
			const postObject = {
				content: req.body.content,
				title: req.body.title,
				imageURL: newImageUrl,
			}

			const newPost = await post.update(postObject, {
				fields: ['content', 'title', 'imageURL']
			})
				.then((response) => {
					console.log(response);
					res.status(200).send({ "post": response, message: "Ce post a bien été modifié !" });
				})
				.catch(error => { console.log(error.message); res.status(500).send({ message: error.message }); });

		} else {

			res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce post !" });
		}
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
		const userId = decodedToken.id;

		let checkAdmin = await model.User.findOne({ where: { id: userId } });
		let post = await model.Post.findOne({ where: { id: req.params.id } });

		if (userId === post.userId || checkAdmin.admin === true) {
			if (post.imageUrl) {
				const filename = post.imageUrl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
				});
			}
			model.Post.destroy({ where: { id: post.id } })
				.then(() => res.status(200).json({ message: "Ce post a bien été supprimé !" }))
				.catch((error) => {
					console.log(error.message);
					res.status(500).json({ message: error.message })
				})

		} else {
			res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer ce post !" });
		}
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
};