const router = require("express").Router();

const Event = require("../../models/Event");
const { Op } = require("sequelize");

//GET all events
router.get("/", (req, res) => {
	Event.findAll({
		// where: {
		// 	event_end_date: {
		// 		[Op.gt]: new Date(),
		// 	},
		// },
	})
		.then((dbResult) => {
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//GET All current and future events
router.get("/future", (req, res) => {
	Event.findAll({
		order: [["event_start_date", "ASC"]],
		where: {
			event_end_date: {
				[Op.gt]: new Date(),
			},
		},
	})
		.then((dbResult) => {
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
//GET old events
router.get("/prev", (req, res) => {
	Event.findAll({
		where: {
			event_end_date: {
				[Op.lt]: new Date(),
			},
		},
	})
		.then((dbResult) => {
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/daterange", (req, res) => {
	console.log("@@@@@@@@@@@@@@@@");
	console.log(req.body);
	Event.findAll({
		order: [["event_start_date", "ASC"]],
		where: {
			[Op.or]: [
				{
					event_start_date: {
						[Op.between]: [req.body.event_start_date, req.body.event_end_date],
					},
				},
				{
					event_end_date: {
						[Op.between]: [req.body.event_start_date, req.body.event_end_date],
					},
				},
			],
			// 	[Op.or]: [
			// 		{
			// 			event_end_date: {
			// 				[Op.gt]: req.body.event_start_date,
			// 			},
			// 		},
			// 		{
			// 			event_start_date: {
			// 				[Op.lt]: req.body.event_end_date,
			// 			},
			// 		},
			// 	],
			// },
			// where: {
			// 	event_end_date: {
			// 		[Op.lt]: req.body.event_end_date,
			// 	},
			// 	event_start_date: {
			// 		[Op.gt]: req.body.event_start_date,
			// 	},
		},
	})
		.then((dbResult) => {
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// /api/events/3
router.get("/:id", (req, res) => {
	Event.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((dbResult) => {
			if (!dbResult) {
				res.status(400).json({ message: "requested event is not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//POST create new event

router.post("/", (req, res) => {
	console.log(req.body);
	Event.create({
		event_title: req.body.event_title,
		event_details: req.body.event_details,
		event_start_date: req.body.event_start_date,
		event_end_date: req.body.event_end_date,
		user_id: req.body.user_id,
	})
		.then((dbResult) => {
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//PUT update the event
router.put("/:id", (req, res) => {
	Event.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((dbResult) => {
			if (!dbResult) {
				res.status(400).json({ message: "requested event is not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//DELETE event

router.delete("/:id", (req, res) => {
	Event.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbResult) => {
			if (!dbResult) {
				res.status(400).json({ message: "requested event is not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
