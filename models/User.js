const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
class User extends Model {
	// hashing pW
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},

		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [6, 30],
			},
		},

		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		zip: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				len: [5],
			},
		},

		neighborhood_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "neighborhood",
				key: "id",
			},
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		hooks: {
			// set up beforeCreate lifecycle "hook" functionality
			async beforeCreate(newUserData) {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},

			async beforeUpdate(updatedUserData) {
				updatedUserData.password = await bcrypt.hash(
					updatedUserData.password,
					10
				);
				return updatedUserData;
			},
		},

		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "user",
	}
);

module.exports = User;
