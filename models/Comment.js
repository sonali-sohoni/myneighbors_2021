const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model { }

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		comment_text: {
			type: DataTypes.STRING,
		},
		post_id: {
			type: DataTypes.INTEGER,
		},
		user_id: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: false,
		modelName: "comment",
	}
);
module.exports = Comment;
