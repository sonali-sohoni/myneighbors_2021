const User = require("../models/User");
const sequelize = require("../config/connection");

const userData = [
	{
		first_name: "Steve",
		last_name: "Steins",
		email: "ssteins@gmail.com",
		password: "ss1234",
		address: "10 mainland dr",
		city: "Woodlands",
		state: "TX",
		zip: 77012,
		neighborhood_id: 1,
		isAdmin: 0,
	},
	{
		first_name: "misha",
		last_name: "mansion",
		email: "mmansion@gmail.com",
		password: "mm1234",
		address: "14 mainland dr",
		city: "Woodlands",
		state: "TX",
		zip: 77012,
		neighborhood_id: 1,
		isAdmin: 0,
	},
	{
		first_name: "abigail",
		last_name: "adams",
		email: "aadams@gmail.com",
		password: "aa1234",
		address: "18 mainland dr",
		city: "Woodlands",
		state: "TX",
		zip: 77012,
		neighborhood_id: 1,
		isAdmin: 0,
	},
	{
		first_name: "Jacob",
		last_name: "Jills",
		email: "jjills@gmail.com",
		password: "jj1234",
		address: "1023 sugarland dr",
		city: "Sugarland",
		state: "TX",
		zip: 77001,
		neighborhood_id: 2,
		isAdmin: 0,
	},
	{
		first_name: "Cindy",
		last_name: "Cannon",
		email: "ccannon@gmail.com",
		password: "cc1234",
		address: "724 Sundarban dr",
		city: "Sugarland",
		state: "TX",
		zip: 77001,
		neighborhood_id: 2,
		isAdmin: 0,
	},
	{
		"id" : 6,
		"first_name" : "ghalia",
		"last_name" : "sami",
		"email" : "ghalia@gmail.com",
		"password" : "$2b$10$1tF48nGA3Xp9leMC9hOvvu/QvFcwwefTVJPAKUBe8BDbz7uYUsmve",
		"address" : "4606 primrose vallen ln",
		"city" : "fulshear",
		"state" : "TX",
		"zip" : 77012,
		"neighborhood_id" : 1,
		"is_admin" : 1,
		"created_at" : "2021-11-30 03:37:58",
		"updated_at" : "2021-11-30 03:37:58"
	},
];

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;
