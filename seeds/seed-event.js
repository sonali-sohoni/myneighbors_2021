const { Event } = require("../models");

const eventData = [
	{
		event_title: "Community Garage Sale",
		event_details:
			"Community Garage Sale for FALL in our neighbourhood. Enjoy!",
		event_start_date: "2021-11-24 8:00:00",
		event_end_date: "2021-11-24 18:00:00",
		user_id: 3,
		// (`id`, , ``, `event_date`, `user_id`) VALUES ('1', 'Community Garage Sale', , '', '1');
	},
	{
		event_title: "Pool Closure for maintenance",
		event_details: "Community pools will be closed for scheduled maintenance. ",
		event_start_date: "2021-11-25 10:00:00",
		event_end_date: "2021-11-25 18:00:00",
		user_id: 1,
	},
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
