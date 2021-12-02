const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Neighborhood extends Model {}

Neighborhood.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		neighborhood_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		zip1: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		zip2: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: false,
		modelName: "neighborhood",
		timestamps: false,
	}
);
module.exports = Neighborhood;
