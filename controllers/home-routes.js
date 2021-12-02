const router = require("express").Router();
const sequelize = require("../config/connection");
const Neighborhood = require("../models/Neighborhood");
const { Post, User, Comment, Event } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

router.get("/signup", (req, res) => {
	Neighborhood.findAll()
		.then((dbResultData) => {
			console.log("---------------------------------------------");
			//  console.log(res.json(dbResultData));
			//  const neighborhoods = dbResultData.map({ plain: true });
			//  const neighborhoods = dbResultData.map((n) => n.get({ plain: true }));
			const neighborhoods = dbResultData.map((n) => n.get({ plain: true }));
			res.render("signup", {
				neighborhoods,
			});
			return;
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
//getting all posts if the user loged in

let to_date = moment().add(1, "days").format("YYYY-MM-DD");
let from_date = moment().subtract(15, "days").format("YYYY-MM-DD");
router.get("/", (req, res) => {
	console.log(from_date, to_date);
	console.log("======================");
	Post.findAll({
		order: [["created_at", "DESC"]],
		attributes: [
			"id",
			"post_details",
			"title",
			"created_at",

			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
				),
				"comment_count",
			],
		],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id"],
				include: {
					model: User,
					attributes: ["first_name", "last_name"],
				},
			},
			{
				model: User,
				attributes: ["first_name", "last_name"],
			},
		],
		where: {
			// created_at: {
			// 	[Op.lt]: to_date,
			// },
			// created_at: {
			// 	[Op.gt]: from_date,
			// },
			created_at: {
				[Op.between]: [from_date, to_date],
			},
		},
	})
		.then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			//console.log(posts);
			res.render("homepage", {
				posts,
				loggedIn: req.session.loggedIn,
				user_first_name: req.session.first_name,
				neighborhood_id: req.session.neighborhood_id,
				isAdmin: req.session.isAdmin,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//DATERANGE /daterange
// router.post("/daterange", (req, res) => {
// 	console.log("POST WITH DATERANGE");
// 	Post.findAll({
// 		order: [["created_at", "DESC"]],
// 		attributes: [
// 			"id",
// 			"post_details",
// 			"title",
// 			"created_at",

// 			[
// 				sequelize.literal(
// 					"(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
// 				),
// 				"comment_count",
// 			],
// 		],
// 		include: [
// 			{
// 				model: Comment,
// 				attributes: ["id", "comment_text", "post_id", "user_id"],
// 				include: {
// 					model: User,
// 					attributes: ["first_name", "last_name"],
// 				},
// 			},
// 			{
// 				model: User,
// 				attributes: ["first_name", "last_name"],
// 			},
// 		],
// 		where: {
// 			created_at: {
// 				[Op.lt]: req.body.to_post_date,
// 			},
// 			created_at: {
// 				[Op.gt]: req.body.from_post_date,
// 			},
// 		},
// 	})
// 		.then((dbPostData) => {
// 			const posts = dbPostData.map((post) => post.get({ plain: true }));
// 			//console.log(posts);
// 			res.json(dbPostData);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

//USER PROFILE

router.get("/userprofile", (req, res) => {
	User.findOne({
		attributes: { exclude: ["password"] },
		where: {
			id: req.session.user_id,
		},
		include: {
			attributes: ["neighborhood_name"],
			model: Neighborhood,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id" });
				return;
			}
			//console.log(dbUserData);
			const user = dbUserData.get({ plain: true });
			res.render("userprofile", { user, loggedIn: req.session.loggedIn });
			// res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//getting single post

router.get("/post/:id", (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			"id",
			"post_details",
			"title",
			"created_at",
			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
				),
				"comment_count",
			],
		],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id"],
				include: {
					model: User,
					attributes: ["first_name", "last_name"],
				},
			},
			{
				model: User,
				attributes: ["first_name", "last_name"],
			},
		],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}

			const post = dbPostData.get({ plain: true });
			console.log(post);
			res.render("single-post", {
				post,
				loggedIn: req.session.loggedIn,
				user_id: req.session.user_id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/event-manager", (req, res) => {
	res.render("event-manager", {
		loggedIn: req.session.loggedIn,
		user_first_name: req.session.first_name,
		neighborhood_id: req.session.neighborhood_id,
		isAdmin: req.session.isAdmin,
	});
});

router.get("/createPost", (req, res) => {
	Post.findAll({
		where: {
			// use the ID from the session
			user_id: req.session.user_id,
		},
		attributes: [
			"id",
			"post_details",
			"title",
			"created_at",

			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
				),
				"comment_count",
			],
		],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id"],
				include: {
					model: User,
					attributes: ["first_name"],
				},
			},
			{
				model: User,
				attributes: ["first_name"],
			},
		],
	})
		.then((dbPostData) => {
			// serialize data before passing to template
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render("createPost", {
				posts,
				loggedIn: req.session.loggedIn,
				user_id: req.session.user_id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//Edit Post route!
router.get("/editPost/:id", (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			"id",
			"post_details",
			"title",
			"created_at",
			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
				),
				"comment_count",
			],
		],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id"],
				include: {
					model: User,
					attributes: ["first_name", "last_name"],
				},
			},
			{
				model: User,
				attributes: ["first_name", "last_name"],
			},
		],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}
			const post = dbPostData.get({ plain: true });
			console.log(post);
			res.render("edit-post", {
				post,
				loggedIn: req.session.loggedIn,
				user_id: req.session.user_id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
