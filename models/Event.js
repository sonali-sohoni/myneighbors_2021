const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require("moment");
class Event extends Model {}
Event.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		event_title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		event_details: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		event_start_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			get() {
				return moment(this.getDataValue("event_start_date")).format(
					"MM/DD/YYYY hh:mm:ss A"
				);
			},
		},
		event_end_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			get() {
				return moment(this.getDataValue("event_end_date")).format(
					"MM/DD/YYYY hh:mm A"
				);
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			default: 6,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: false,
		modelName: "event",
	}
);
module.exports = Event;
