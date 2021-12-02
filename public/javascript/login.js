async function loginForm(event) {
	event.preventDefault();
	const email = document.querySelector("#email").value.trim();
	const password = document.querySelector("#password").value.trim();
	if (email === "") {
		document.querySelector("#email").style.background = "red";
		document.querySelector("#errMsg").innerHTML = "Please enter your email";
	} else if (password === "") {
		document.querySelector("#password").style.background = "red";
		document.querySelector("#errMsg").innerHTML = "Please enter your password";
	}
	if (email === "" && password === "") {
		document.querySelector("#password").style.background = "red";
		document.querySelector("#email").style.background = "red";
		document.querySelector("#errMsg").innerHTML =
			"Please enter the required information";
	}

	if (email && password) {
		const response = await fetch("/api/users/login", {
			method: "post",
			body: JSON.stringify({
				email,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			console.log("ok");
			document.location.replace("/");
		} else
			document.querySelector("#errMsg").innerHTML = "Wrong email OR password";
	}
}

async function logout() {
	const response = await fetch("/api/users/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		console.log("Logged out");
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
}
if (document.getElementById("login"))
	document.querySelector("#login").addEventListener("click", loginForm);

if (document.getElementById("logout")) {
	document.getElementById("logout").addEventListener("click", logout);
	// document
	// 	.getElementById("userprofileButton")
	// 	.addEventListener("click", accessProfile);
}

// <div class="col mb-5 h-100">
// 	<div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
// 		<i class="bi bi-calendar3"></i>
// 	</div>
// 	<h2 class="h5"></h2>
/* <p class="mb-0">
	Paragraph of text beneath the heading to explain the heading. Here is just a
	bit more text.
</p>; */
// 	<p class="mb-0"></p>
// </div>;

function buildEventCards(events) {
	//events[0];
	for (let i = 0; i < events.length; i++) {
		const evt = events[i];

		let div1 = $("<div>").addClass("col mb-4 h-100 event-card");
		let div2 = $("<div>").addClass(
			"feature bg-primary bg-gradient text-white rounded-3 mb-3"
		);
		div2.html('<i class="bi bi-calendar3"></i>');
		console.log(evt.event_title);
		let h2 = $("<h2>").addClass("h5");
		h2.html(evt.event_title);
		let p2 = $("<p>").addClass("mb-0");
		let details = evt.event_details;
		details += "<br> <span class='fw-bold'>Start Date: " + evt.event_start_date;
		details +=
			"</span><br> <span class='fw-bold'> End Date: " + evt.event_end_date;
		details += "</span";
		p2.html(details);

		div1.append(div2, h2, p2);
		console.log(div1);
		$("#eventCardContainer").append(div1);
	}
}

function viewPostsByDateRange() {
	let from_post_date = $("#from_post_date").val();
	let to_post_date = $("#to_post_date").val();
	let _from_post_date = moment(from_post_date, dtpickerFormat).subtract(
		1,
		"days"
	);
	let _to_post_date = moment(to_post_date, dtpickerFormat).add(1, "days");

	let from_post_date_seq = _from_post_date.format(format1);
	let to_post_date_seq = _to_post_date.format(format1);
	console.log(from_post_date_seq, to_post_date_seq);
	fetch("/api/posts/daterange", {
		method: "POST",
		body: JSON.stringify({
			to_post_date: to_post_date_seq,
			from_post_date: from_post_date_seq,
		}),
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((data) => {
			console.log(data);
			buildPostsSection(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

function buildPostsSection(posts) {
	$("#postsContainer").empty();
	for (let i = 0; i < posts.length; i++) {
		let thisPost = posts[i];
		let post_date_seq = moment(thisPost.created_at, format1);
		let post_date = post_date_seq.format(dtpickerFormat);

		let div1 = $("<div>").addClass("d-flex text-muted pt-3");

		div1.html(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#dcae1d" class="bi bi-signpost-2-fill flex-shrink-0 me-2 rounded " viewBox="0 0 16 16">
  <path d="M7.293.707A1 1 0 0 0 7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586A1 1 0 0 0 7.293.707z"/>
</svg>`);

		let atag = $("<a>").attr("href", "/post/" + thisPost.id);
		atag.attr("style", "text-decoration: none");

		let div_post_holder = $("<div>").addClass(
			"pb-3 mb-0 small lh-sm border-bottom w-100"
		);
		let div_title = $("<div>")
			.addClass("d-flex justify-content-between align-items-center")
			.append(
				$("<p>").html(
					`<strong class="text-dark fw-bold">${thisPost.title}</strong>`
				)
			);
		let div_details = $("<div>")
			.addClass("text-dark-gray fw-bold")
			.html(thisPost.post_details);
		let div_blank = $("<div>");
		let div_user = $("<div>")
			.addClass("d-block text-primary fw-bold")
			.html(
				`By ${thisPost.user.first_name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${post_date};&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${thisPost.comment_count} comment(s)`
			);
		div_post_holder.append(div_title, div_details, div_blank, div_user);
		atag.append(div_post_holder);
		div1.append(atag);
		$("#postsContainer").append(div1);
	}
}

window.onload = function () {
	//GET NEIGHBORHOODS

	let neighborhoods = [];
	loadNeighborhoodsData()
		.then((data) => {
			neighborhoods = data;
			if (document.getElementById("neighborhood_id_hidden")) {
				const user_neighborhood = document.getElementById(
					"neighborhood_id_hidden"
				).value;
				const neighborhood = neighborhoods.find(
					(n) => n.id == user_neighborhood
				);
				console.log(neighborhood);
				document.getElementById("welcome_msg_holder").innerHTML =
					"Welcome To " + neighborhood.neighborhood_name;
			}

			return data;
		})
		.then((err) => {});

	//GET EVENTS
	let events = [];
	loadEventsData()
		.then((data) => {
			events = data;
			console.log(events);
			buildEventCards(events);
		})
		.catch((err) => {
			console.log(err);
		});

	$("#from_post_date").datepicker({
		duration: "fast",
		showAnim: "slideDown",
		showOptions: { direction: "up" },
		defaultDate: new Date(),
	});
	$("#from_post_date").datepicker("setDate", -15);

	$("#to_post_date").datepicker({
		duration: "fast",
		showAnim: "slideDown",
		showOptions: { direction: "up" },
		defaultDate: new Date(),
	});
	$("#to_post_date").datepicker("setDate", new Date());
	$("#viewPostButton").on("click", viewPostsByDateRange);
};
