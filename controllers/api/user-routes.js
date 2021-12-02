const router = require("express").Router();
const { User, Post } = require("../../models");
const verify_user_address = require("../address_verify");
// get all users
router.get("/", (req, res) => {
	User.findAll({
		attributes: { exclude: ["password"] },
		include: [
			{
				model: Post,
				attributes: ["id", "title", "post_details", "created_at"],
			},
		],
	})
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//get user by Id
router.get("/:id", (req, res) => {
	User.findOne({
		attributes: { exclude: ["password"] },
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Post,
				attributes: ["id", "title", "post_details", "created_at"],
			},
		],
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//NEW USER SIGNUP
router.post("/", (req, res) => {
	// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
	User.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		neighborhood_id: req.body.neighbourhood_id,
		isAdmin: req.body.isAdmin,
	})
		.then((dbUserData) => {
			req.session.save(() => {
				req.session.user_id = dbUserData.id;
				req.session.first_name = dbUserData.first_name;
				//	req.session.username = dbUserData.username;
				req.session.isAdmin = dbUserData.isAdmin;
				req.session.neighborhood_id = dbUserData.neighborhood_id;
				req.session.loggedIn = true;
				res.json(dbUserData);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// login User
router.post("/login", (req, res) => {
	// expects {email: 'lernantino@gmail.com', password: 'password1234'}
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(400).json({ message: "No user with that email address!" });
				return;
			}

			const validPassword = dbUserData.checkPassword(req.body.password);

			if (!validPassword) {
				res.status(400).json({ message: "Incorrect password!" });
				return;
			}

			req.session.save(() => {
				req.session.user_id = dbUserData.id;
				req.session.first_name = dbUserData.first_name;
				req.session.loggedIn = true;
				req.session.isAdmin = dbUserData.isAdmin;
				req.session.neighborhood_id = dbUserData.neighborhood_id;

				res.json({ user: dbUserData, message: "You are now logged in!" });
			});
		})
		.then((err) => {
			console.log(err);
		});
});

//loging out
router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});
//Updating user data
router.put("/:id", (req, res) => {
	console.log(req.body);
	// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

	// pass in req.body instead to only update what's passed through
	User.update(req.body, {
		individualHooks: true,
		where: {
			id: req.params.id,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
//   Delete the user
router.delete("/:id", (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
//VERIFY USER ADDRESS
router.post("/smartystreets", (req, res) => {
	let flag = false;
	verify_user_address(
		req.body.address,
		req.body.city,
		req.body.state,
		req.body.zip
	)
		.then((result) => {
			console.log(result);
			console.log("ssrsponds with" + result);
			res.json({ ssresult: result });
		})
		.catch((err) => {
			console.log(err);
			//console.log("address verification failed %%%%%%%%%%");
			res.status(500).json({ message: "address verification failed" });
		});
	// .then((response1) => {
	//	response1.lookups.map((lookup) => console.log(lookup.result));

	//	return true;

	// if (data.length > 0) {
	// 	console.log("address verified**************");

	// } else {
	// 	console.log("failed again");
	// 	res.status(500).json({ message: "address verification failed" });
	// }
});
module.exports = router;
