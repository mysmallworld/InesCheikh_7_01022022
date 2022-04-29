const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

const model = require('../models');

exports.likesPost = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.id;

    try {
        const post = await model.Post.findOne({
            where: { id: req.params.id },
        });
        const user = await model.User.findOne({
			attributes: ['firstName', 'lastName', 'id', 'avatar'],
			where: { id: userId }
		});
        
        if (post != null && post.id == req.params.id && user != null) {

            const isLiked = await model.Likes.findOne({
                where: { postId: post.id, userId: userId }
            });

            const isDisLiked = await model.Dislikes.findOne({
                where: { postId: post.id, userId: userId }
            });

            if (isLiked !== null) {
                model.Likes.destroy(
                    { where: { userId: userId, postId: post.id } },
                    { truncate: true, restartIdentity: true }
                );

                res.status(200).json({ message: "Neutre !" });
            }
            else {
                if (isDisLiked != null) {
                    model.Dislikes.destroy(
                        { where: { userId: userId, postId: post.id } },
                        { truncate: true, restartIdentity: true }
                    ).then(console.log("delete dislike"));
                }

                model.Likes.create({
                    include: [
                        {
                            model: model.User,
                            attributes: ['firstname', 'lastname', 'id', 'avatar']
                        }
                    ],

                    UserId: userId,
                    PostId: post.id,
                }).then(res.status(200).json({ message: "Vous aimé ce post !" }));

            }
        } else {
            res.status(404).json({ message: "Post introuvable !" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.dislikesPost = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.id;

    try {
        const post = await model.Post.findOne({
            where: { id: req.params.id },
        });
        const user = await model.User.findOne({
			attributes: ['firstName', 'lastName', 'id', 'avatar'],
			where: { id: userId }
		});

        if (post != null && post.id == req.params.id && user != null) {

            const isLiked = await model.Likes.findOne({
                where: { postId: post.id, userId: userId }
            });

            const isDisLiked = await model.Dislikes.findOne({
                where: { postId: post.id, userId: userId }
            });

            if (isDisLiked !== null) {
                model.Dislikes.destroy(
                    { where: { userId: userId, postId: post.id } },
                    { truncate: true, restartIdentity: true }
                );

                res.status(200).json({ message: "Neutre !" });
            }
            else {
                if (isLiked != null) {
                    model.Likes.destroy(
                        { where: { userId: userId, postId: post.id } },
                        { truncate: true, restartIdentity: true }
                    ).then(console.log("delete like"));
                }

                model.Dislikes.create({
                    include: [
                        {
                            model: model.User,
                            attributes: ['firstname', 'lastname', 'id', 'avatar']
                        }
                    ],

                    UserId: userId,
                    PostId: post.id,
                }).then(res.status(200).json({ message: "Vous n'aimé pas ce post !" }));

            }
        } else {
            res.status(404).json({ message: "Post introuvable !" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};