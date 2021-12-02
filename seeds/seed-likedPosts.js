const LikedPosts = require("../models/LikedPosts");
const sequelize = require("../config/connection");
const likedPostsData = [
	{
		user_id: 1,
		post_id: 1,
	},
	{
		user_id: 2,
		post_id: 1,
	},
	{
		user_id: 3,
		post_id: 2,
	},
	{
		user_id: 4,
		post_id: 2,
	},
	{
		user_id: 5,
		post_id: 3,
	},
	{
		user_id: 5,
		post_id: 5,
	},
	{
		user_id: 5,
		post_id: 15,
	},
	{
		user_id: 5,
		post_id: 10,
	},
	{
		user_id: 4,
		post_id: 14,
	},
	{
		user_id: 4,
		post_id: 12,
	},
	{
		user_id: 4,
		post_id: 9,
	},
];

const seedLikedPosts = () => LikedPosts.bulkCreate(likedPostsData);
module.exports = seedLikedPosts;
