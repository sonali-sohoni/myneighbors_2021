//let neighborhoods = [];

//--------------------------------------------------------------------
function validateUserAddress(address, city, state, zip) {
	// address = "7904 Capitol St";
	// city = "houston";
	// state = "TX";
	// zip = "77012";

	return fetch("/api/users/smartystreets", {
		method: "POST",
		body: JSON.stringify({ address, city, state, zip }),
		headers: { "Content-Type": "application/json" },
	})
		.then((result) => {
			return result.json();
		})
		.then((data) => {
			console.log("1" + data.ssresult);
			return data;
		});
}

function insertData() {
	const first_name = document.getElementById("first_name").value;
	const last_name = document.getElementById("last_name").value;
	const address = document.getElementById("address").value;
	const city = document.getElementById("city").value;
	const state = document.getElementById("state").value;
	const zip = document.getElementById("zip").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const neighborhood = document.getElementById("neighborhood_select").value;
	return fetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			first_name,
			last_name,
			address,
			city,
			state,
			zip,
			email,
			password,
			neighbourhood_id: 1,
			is_admin: 1,
		}),
		headers: { "Content-Type": "application/json" },
	});
}

const signupFormHandler = async (event) => {
	event.preventDefault();
	const first_name = document.getElementById("first_name").value;
	const last_name = document.getElementById("last_name").value;
	const address = document.getElementById("address").value;
	const city = document.getElementById("city").value;
	const state = document.getElementById("state").value;
	const zip = document.getElementById("zip").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const neighborhood = document.getElementById("neighborhood_select").value;

	const user = {
		first_name,
		last_name,
		address,
		city,
		state,
		zip,
		email,
		password,
		neighborhood,
	};

	if (!validateUser(user)) {
		printErrorMsg(
			"Required fields are missing." +
				invalid_neighborhood_msg +
				" Please try again."
		);
		return false;
	}

	validateUserAddress(address, city, state, zip)
		.then((data) => {
			console.log("2", data.ssresult);
			if (data.ssresult) {
				return insertData();
			} else return null;
		})
		.then((data) => {
			if (!data) {
				//	alert(response.statusText);
				printErrorMsg("Smarty Street Address Verification failed");
			} else {
				//smarty streets successful
				if (data.ok) {
					console.log(data);
					console.log("success");
					document.location.replace("/");
				} else {
					alert(data.statusText);
					printErrorMsg(data.statusText);
				}
			}
		});

	// if (!validateUser(user)) {
	// 	printErrorMsg(
	// 		"Required fields are missing." +
	// 			invalid_neighborhood_msg +
	// 			" Please try again."
	// 	);
	// 	return false;
	// }

	// const response = await fetch("/api/users", {
	// 	method: "POST",
	// 	body: JSON.stringify({
	// 		first_name,
	// 		last_name,
	// 		address,
	// 		city,
	// 		state,
	// 		zip,
	// 		email,
	// 		password,
	// 		neighbourhood_id: 1,
	// 		is_admin: 1,
	// 	}),
	// 	headers: { "Content-Type": "application/json" },
	// });
	// if (response.ok) {
	// 	console.log("success");
	// 	document.location.replace("/");
	// } else {
	// 	alert(response.statusText);
	// 	printErrorMsg(response.statusText);
	// }
};

//-=-----------------------------------------------------------------------

let invalid_neighborhood_msg = "";
const validateUser = (user) => {
	invalid_neighborhood_msg = "";
	var rv = true;
	document.querySelector("#submitErrorMessage").classList.add("d-none");
	if (user.first_name === "") {
		console.log(":::here:::");
		document.getElementById("first_name").style.background = "red";
		rv = false;
	}
	if (user.last_name === "") {
		document.getElementById("last_name").style.background = "red";
		rv = false;
	}
	if (user.address === "") {
		document.getElementById("address").style.background = "red";
		rv = false;
	}
	if (user.city === "") {
		document.getElementById("city").style.background = "red";
		rv = false;
	}
	if (user.state === "") {
		document.getElementById("state").style.background = "red";
		rv = false;
	}
	if (user.zip === "") {
		document.getElementById("zip").style.background = "red";
		rv = false;
	}

	if (user.email === "") {
		document.getElementById("email").style.background = "red";
		rv = false;
	}

	if (user.password === "") {
		document.getElementById("password").style.background = "red";
		rv = false;
	}

	console.log(user.neighborhood);
	if (user.neighborhood === "0") {
		document.getElementById("neighborhood_select").style.background = "red";
		rv = false;
	} else {
		console.log(neighborhoods);
		const neighborhood = neighborhoods.find((n) => {
			return n.id == user.neighborhood;
		});
		console.log(neighborhood);
		if (neighborhood.zip1 != user.zip && neighborhood.zip2 != user.zip) {
			console.log("both false " + neighborhood.zip1 + neighborhood.zip2);
			document.getElementById("neighborhood_select").style.background = "red";
			invalid_neighborhood_msg =
				" Selected neighborhood and zipcode entered does not match.";
			rv = false;
		} else {
			console.log("correct zip");
		}
	}

	return rv;
};

//DONOT TOUCH
// const signupFormHandler = async (event) => {
// 	event.preventDefault();
// 	const first_name = document.getElementById("first_name").value;
// 	const last_name = document.getElementById("last_name").value;
// 	const address = document.getElementById("address").value;
// 	const city = document.getElementById("city").value;
// 	const state = document.getElementById("state").value;
// 	const zip = document.getElementById("zip").value;
// 	const email = document.getElementById("email").value;
// 	const password = document.getElementById("password").value;
// 	const neighborhood = document.getElementById("neighborhood_select").value;

// 	const user = {
// 		first_name,
// 		last_name,
// 		address,
// 		city,
// 		state,
// 		zip,
// 		email,
// 		password,
// 		neighborhood,
// 	};

// 	if (!validateUser(user)) {
// 		printErrorMsg(
// 			"Required fields are missing." +
// 				invalid_neighborhood_msg +
// 				" Please try again."
// 		);
// 		return false;
// 	}
// 	const response = await fetch("/api/users", {
// 		method: "POST",
// 		body: JSON.stringify({
// 			first_name,
// 			last_name,
// 			address,
// 			city,
// 			state,
// 			zip,
// 			email,
// 			password,
// 			neighbourhood_id: 1,
// 			is_admin: 1,
// 		}),
// 		headers: { "Content-Type": "application/json" },
// 	});
// 	if (response.ok) {
// 		console.log("success");
// 		document.location.replace("/");
// 	} else {
// 		alert(response.statusText);
// 		printErrorMsg(response.statusText);
// 	}
// };

function printErrorMsg(msg) {
	let errormsgHolder = document.querySelector("#submitErrorMessage");
	errormsgHolder.innerHTML = msg;
	errormsgHolder.setAttribute("style", "font-weight:bold;color:red;");
	errormsgHolder.classList.remove("d-none");
}
// const loadNeighborhoodsData = async () => {
// 	const response = await fetch("/api/neighborhoods");
// 	if (response.ok) {
// 		const neighborhoods_data = response.json();
// 		return neighborhoods_data;
// 	} else return null;
// };
const loadData = () => {
	let allInputs = document.querySelectorAll(".form-control,.form-select");
	for (let i = 0; i < allInputs.length; i++) {
		//allInputs[i].value = ""
		allInputs[i].addEventListener("focus", changeBgColor);
	}
	console.log(allInputs);
	// 	loadNeighborhoodsData()
	// 		.then((data) => {
	// 			neighborhoods = data;
	// 			console.log(neighborhoods);
	// 			return data;
	// 		})
	// 		.then((err) => {});
};

function changeBgColor() {
	if (this.style.backgroundColor == "red") this.style.backgroundColor = "white";
}

document
	.getElementById("submitButton")
	.addEventListener("click", signupFormHandler);
console.log(document.getElementById("CancelButton"));
document.getElementById("CancelButton").onclick = function (event) {
	event.preventDefault();
	console.log("joo");
	document.location = "/";
};
loadData();
