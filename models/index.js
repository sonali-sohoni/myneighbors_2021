const Comment = require("./Comment");
const Event = require("./Event");
const Post = require("./Post");
const User = require("./User");
const Neighborhood = require("./Neighborhood");
//const LikedPosts = require("./LikedPosts");

//associations
User.hasMany(Post, {
	foreignKey: "user_id",
	//	onDelete: "SET NULL",
});

Post.belongsTo(User, {
	foreignKey: "user_id",
	//	onDelete: "SET NULL",
});

User.belongsToMany(Post, {
	through: "LikedPosts",
	foreignKey: "user_id",
	//	onDelete: "SET NULL",
});
Post.belongsToMany(User, {
	through: "LikedPosts",
	foreignKey: "post_id",
	//	onDelete: "SET NULL",
});

// LikedPosts.belongsTo(User, {
// 	foreignKey: "user_id",
// 	onDelete: "SET NULL",
// });

// LikedPosts.belongsTo(Post, {
// 	foreignKey: "post_id",
// 	onDelete: "SET NULL",
// });

Comment.belongsTo(User, {
	foreignKey: "user_id",
	//	onDelete: "SET NULL",
});

Comment.belongsTo(Post, {
	foreignKey: "post_id",
	//onDelete: "CASCADE",
});

User.hasMany(Comment, {
	foreignKey: "user_id",
	//	onDelete: "SET NULL",
});

Post.hasMany(Comment, {
	foreignKey: "post_id",
	//onDelete: "SET NULL",
});

User.belongsTo(Neighborhood, {
	foreignKey: "neighborhood_id",
	//	onDelete: "SET NULL",
});
Neighborhood.hasMany(User, {
	foreignKey: "neighborhood_id",
	//	onDelete: "SET NULL",
});

module.exports = { Comment, Event, Post, User, Neighborhood };
