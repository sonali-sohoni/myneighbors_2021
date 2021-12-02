const Post = require("../models/Post");

const postdata = [
	{
		title: "Donec posuere metus vitae ipsum.",
		post_details: "https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png",
		user_id: 3,
	},
	{
		title: "Morbi non quam nec dui luctus rutrum.",
		post_details: "https://nasa.gov/donec.json",
		user_id: 2,
	},
	{
		title:
			"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
		post_details:
			"https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx",
		user_id: 1,
	},
	{
		title: "Nunc purus.",
		post_details: "http://desdev.cn/enim/blandit/mi.jpg",
		user_id: 3,
	},
	{
		title: "Pellentesque eget nunc.",
		post_details: "http://google.ca/nam/nulla/integer.aspx",
		user_id: 2,
	},
	{
		title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
		post_details: "https://stanford.edu/consequat.png",
		user_id: 2,
	},
	{
		title: "In hac habitasse platea dictumst.",
		post_details: "http://edublogs.org/non/ligula/pellentesque.js",
		user_id: 1,
	},
	{
		title: "Morbi non quam nec dui luctus rutrum.",
		post_details: "http://ucla.edu/consequat/nulla.html",
		user_id: 1,
	},

	{
		title: "Duis ac nibh.",
		post_details: "http://theguardian.com/dui/vel/nisl/duis/ac/nibh.aspx",
		user_id: 4,
	},
	{
		title: "Curabitur at ipsum ac tellus semper interdum.",
		post_details: "https://reverbnation.com/ligula/sit.jpg",
		user_id: 5,
	},
	{
		title: "In hac habitasse platea dictumst.",
		post_details: "http://china.com.cn/lectus/vestibulum.json",
		user_id: 3,
	},

	{
		title: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
		post_details:
			"http://networksolutions.com/nam/ultrices/libero/non/mattis/pulvinar.json",
		user_id: 5,
	},
	{
		title: "Donec dapibus.",
		post_details: "https://instagram.com/ac/neque/duis/bibendum/morbi/non.xml",
		user_id: 5,
	},
	{
		title: "Nulla tellus.",
		post_details: "https://lycos.com/natoque/penatibus/et.html",
		user_id: 2,
	},
	{
		title:
			"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
		post_details: "https://gmpg.org/lorem.jpg",
		user_id: 2,
	},
	{
		title:
			"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
		post_details: "https://paginegialle.it/mattis/egestas.jsp",
		user_id: 2,
	},
	{
		title: "In hac habitasse platea dictumst.",
		post_details: "http://wikia.com/turpis/eget.jpg",
		user_id: 1,
	},
	{
		title: "Etiam justo.",
		post_details: "https://shareasale.com/quis.json",
		user_id: 4,
	},
	{
		title: "Nulla ut erat id mauris vulputate elementum.",
		post_details:
			"http://java.com/diam/neque/vestibulum/eget/vulputate/ut/ultrices.png",
		user_id: 5,
	},
	{
		title:
			"Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
		post_details: "https://java.com/at/nibh/in.png",
		user_id: 3,
	},
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
