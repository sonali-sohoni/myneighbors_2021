const seedEvents = require("./seed-event");
const seedComments = require("./seed-comment");
const seedUsers = require("./seed-user");
const seedPosts = require("./seed-post");
const sequelize = require("../config/connection");
const seedNeighborhoods = require("./seed-neighborhood");
const seedLikedPosts = require("./seed-likedPosts");

async function seedAll() {
	await sequelize.sync({ force: true });
	console.log("\n----- DATABASE SYNCED -----\n");
	await seedNeighborhoods();
	console.log("\n----- NEIGHBORHOODS SEEDED -----\n");
	await seedUsers();
	console.log("\n----- USERS SEEDED -----\n");

	await seedPosts();
	console.log("\n ---- POSTS seeded");

	await seedLikedPosts();
	console.log("\n ---- LIKEDPOSTS seeded");
	await seedComments();
	console.log("\n----- COMMENTS SEEDED -----\n");
	await seedEvents();
	console.log("\n----- EVENTS SEEDED -----\n");

	process.exit(0);
}

// function seedAll() {
// 	sequelize
// 		.sync({ force: true })
// 		.then((data) => {
// 			console.log("\n----- DATABASE SYNCED -----\n");
// 			return seedNeighborhoods();
// 		})
// 		.then((data) => {
// 			console.log("\n----- NEIGHBORHOODS SEEDED -----\n");
// 			return seedUsers();
// 		})
// 		.then((data) => {
// 			console.log("\n----- USERS SEEDED -----\n");
// 			return seedPosts();
// 		})
// 		.then((data) => {
// 			console.log("\n----- POSTS SEEDED -----\n");
// 			return seedComments();
// 		})
// 		.then((data) => {
// 			console.log("\n----- COMMENTS SEEDED -----\n");
// 			return seedEvents();
// 		})
// 		.then((data) => {
// 			console.log("\n----- EVENTS SEEDED -----\n");
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// }
seedAll();
