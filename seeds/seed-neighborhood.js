const Neighborhood = require("../models/Neighborhood");
const sequelize = require("../config/connection");

const neighborhood_data = [
	{
		neighborhood_name: "WoodLand Lakes",
		zip1: 77012,
	},
	{
		neighborhood_name: "Sugarland Lakes",
		zip1: 77001,
	},
];
const seedNeighborhoods = () => Neighborhood.bulkCreate(neighborhood_data);
module.exports = seedNeighborhoods;
