const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

const model = require('../models');

exports.createComment = async (req, res) => {

	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
	const userId = decodedToken.id;

	try {
		const post = await model.Post.findOne({
			attributes: ["id", "title", "content", "imageURL", "userId", "createdAt"],
			include: [{
				model: model.User,
				attributes: ["avatar", "lastname", "firstname"]
			}]
		})

		if (post !== null) {
			const comment = model.Comment.create({
                include: [
					{
						model: model.User,
						attributes: ['firstname', 'lastname', 'id', 'avatar']
					}
				],
			
				comment: req.body.comment || '',
				UserId: userId,
				PostId: post.id,
			})
				.then((response) => res.status(200).json({ "comment": response, message: "Commentaire postée !" }))
				.catch(error => { res.status(500).json({ message: error.message }); });

		} else {
			res.status(404).json({ message: "Post introuvable !" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

exports.getOneComment = async (req, res) => {
	model.Comment.findOne({
		where: { id: req.params.id },
		attributes: ["id", "comment", "UserId", "PostId", "createdAt"],
		include: [{
			model: model.User,
			attributes: ["avatar", "lastname", "firstname"]
		}]
	})
		.then((comment) => {
			if (comment) {
				res.status(200).json({ message: "Commentaire trouvé !", comment });
			} else {
				return res.status(404).json({ message: "Commentaire introuvable !" });
			}
		})
		.catch((error) => {
			console.error(error.message);
			return res.status(500).json({ message: error.message });
		});
};

exports.getAllComment = async (req, res) => {
	model.Comment.findAll({
		order: [['updatedAt', 'DESC']],
		attributes: ["id", "comment", "UserId", "PostId", "createdAt", "updatedAt"],
		include: [{
			model: model.User, attributes: ["avatar", "lastname", "firstname"]
		}],
	})
		.then((comments) => {
			if (comments) {
				res.status(200).json({ message: "Commentaires trouvés !", comments });
			} else {
				return res.status(404).json({ message: "Commentaires introuvables !" });
			}
		})
		.catch((error) => {
			console.error(error.message);
			return res.status(500).json({ message: error.message });
		});
};

exports.getMyComment = async (req, res) => {
	model.Comment.findAll({
		where: { userId: req.params.id },
		order: [['updatedAt', 'DESC']],
		attributes: ["id", "comment", "UserId", "PostId", "createdAt", "updatedAt"],
		include: [{
			model: model.User, attributes: ["avatar", "lastname", "firstname"]
		}],
	})
		.then((comments) => {
			if (comments) {
				res.status(200).json({ message: "Commentaires trouvés !", comments });
			} else {
				return res.status(404).json({ message: "Commentaires introuvables !" });
			}
		})
		.catch((error) => {
			console.error(error.message);
			return res.status(500).json({ message: error.message });
		});
};

exports.updateComment = async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
		const userId = decodedToken.id;
		console.log(userId);

		let comments = await model.Comment.findOne({ where: { id: req.params.id } });

		if (userId === comments.UserId) {

			comments.comment = req.body.comment;

			const newComment = await comments.update({
				fields: ['comment']
			})
				.then((response) => {
					console.log(response);
					res.status(200).send({ "comment": response, message: "Ce commentaire a bien été modifié !" });
				})
				.catch(error => { console.log(error.message); res.status(500).send({ message: error.message }); });

		} else {
			res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce commentaire !" });
		}
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}

}

exports.deleteComment = async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
		const userId = decodedToken.id;

		let checkAdmin = await model.User.findOne({ where: { id: userId } });
		let comments = await model.Comment.findOne({ where: { id: req.params.id } });
        console.log(comments)

		if (userId === comments.UserId || checkAdmin.admin === true) {
			
			model.Comment.destroy({ where: { id: comments.id } })
				.then(() => res.status(200).json({ message: "Ce commentaire a bien été supprimé !" }))
				.catch((error) => {
					console.log(error.message);
					res.status(500).json({ message: error.message })
				})

		} else {
			res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer ce commentaire !" });
		}
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
}