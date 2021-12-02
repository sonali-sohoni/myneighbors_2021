const Comment = require("../models/Comment");
const sequelize = require("../config/connection");

const commentData = [
	{
		comment_text: "Comment text 1 post 1  by user 1",
		user_id: 1,
		post_id: 1,
	},
	{
		comment_text: "Comment text 2  post 2 by user 1",
		user_id: 1,
		post_id: 2,
	},
	{
		comment_text: "Comment 3 post 1 by user 2",
		user_id: 2,
		post_id: 1,
	},
	{
		comment_text: "Comment text 4 post 2 by user 2",
		user_id: 2,
		post_id: 2,
	},
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
