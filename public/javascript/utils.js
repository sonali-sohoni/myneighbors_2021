let neighborhoods = [];
let events = [];
const loadNeighborhoodsData = async () => {
	const response = await fetch("/api/neighborhoods");
	if (response.ok) {
		const neighborhoods_data = response.json();
		return neighborhoods_data;
	} else return null;
};

loadNeighborhoodsData()
	.then((data) => {
		neighborhoods = data;
		console.log(neighborhoods);
		return data;
	})
	.catch((err) => {});

const loadEventsData = async () => {
	const response = await fetch("/api/events/future");
	return response.json();
};

loadEventsData()
	.then((data) => {
		//	console.log(data);
		return data;
	})
	.catch((err) => {
		console.log(err);
	});
