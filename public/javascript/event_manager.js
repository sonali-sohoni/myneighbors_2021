const format1 = "YYYY-MM-DD HH:mm:ss";
const dtpickerFormat = "M/D/YYYY";
function getEventsByDateRange(from_date_seq, to_date_seq) {
	fetch("/api/events/daterange", {
		method: "POST",
		body: JSON.stringify({
			event_end_date: to_date_seq,
			event_start_date: from_date_seq,
		}),
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((data) => {
			console.log(data);
			buildEventsSection(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

function viewEvents(event) {
	console.log($("#to_date").val());
	let from_date = $("#from_date").val();
	let to_date = $("#to_date").val();
	$("#view_event_error").html("");
	let _from_date = moment(from_date, dtpickerFormat);
	let _to_date = moment(to_date, dtpickerFormat);

	let from_date_seq = _from_date.format(format1);
	let to_date_seq = _to_date.format(format1);
	console.log(to_date_seq);
	if (moment(from_date_seq).isBefore(to_date_seq)) {
		//	alert("dates are correct");
	} else {
		//	alert("wrong dates");
		$("#view_event_error").html("Please check the dates");
		$("#view_event_error").addClass("text-danger fw-bold");
		return false;
	}
	getEventsByDateRange(from_date_seq, to_date_seq);
}
function buildEventsSection(events) {
	$("#events-holder").empty();
	var bulletColors = ["#dcae1d", "#007bff", "#6f42c1"];
	for (let i = 0; i < events.length; i++) {
		let evt = events[i];
		let j = i % 3;
		//	console.log(evt);
		let div1 = $("<div>").addClass("d-flex text-muted pt-3");
		let svg = `	<svg class="bd-placeholder-img flex-shrink-0 me-2 rounded"
					width="32"
					height="32"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Placeholder: 32x32"
					preserveAspectRatio="xMidYMid slice"
					focusable="false"
				><title>Placeholder</title><rect
						width="100%"
						height="100%"
						fill=${bulletColors[j]} 
					></rect><text
						x="50%"
						y="50%"
						fill=${bulletColors[j]}
						dy=".3em"
					>32x32</text></svg>`;
		div1.html(svg);
		let p1 = $("<p>").addClass("pb-3 mb-0 small lh-sm border-bottom");
		let p1html = `<strong class=d-block text-gray-dark">${evt.event_title}</strong>
	${evt.event_details}<br>
	${evt.event_start_date} - ${evt.event_end_date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
		p1.html(p1html);
		div1.append(p1);
		let btn = $("<button>").addClass("btn btn-secondary btn-sm h-2 deletebtn ");
		btn.attr("id", "deleteEvent" + evt.id);
		btn.attr("data-id", evt.id);
		btn.html("Delete");
		//	console.log(btn);
		p1.append(btn);
		$("#events-holder").append(div1);
	}
	console.log("here r deletes");
	$(".deletebtn").on("click", function () {
		deleteEvent($(this).attr("data-id"));
	});
}

async function deleteEvent(event_id) {
	let response = await fetch("/api/events/" + event_id, {
		method: "DELETE",
	});
	if (response.ok) {
		console.log("successfully deleted");
		viewEvents();
	}
}

function eventformSubmitHandler() {
	$("#event_submit_error").html("");
	let event_title = $("#event_title").val().trim();
	let event_details = $("#event_details").val().trim();
	console.log(event_details, event_title);
	let event_start_date = $("#event_start_dt").val();
	let event_start_time = $("#event_start_time").val();
	console.log(event_start_time);
	event_start_date += " " + event_start_time + ":00";
	console.log(event_start_date);
	let _event_start_date = moment(event_start_date, "M/D/YYYY HH:mm:ss");
	console.log(_event_start_date);
	//	alert(_event_start_date);
	let event_start_date_seq = _event_start_date.format(format1);
	//alert(event_start_date_seq);

	let event_end_date = $("#event_end_dt").val();
	let event_end_time = $("#event_end_time").val();
	console.log(event_end_time);
	event_end_date += " " + event_end_time + ":00";
	console.log(event_end_date);
	let _event_end_date = moment(event_end_date, "M/D/YYYY HH:mm:ss");
	console.log(_event_end_date);
	//	alert(_event_end_date);
	let event_end_date_seq = _event_end_date.format(format1);
	//	alert(event_end_date_seq);

	if (
		!validateEventData(
			event_title,
			event_details,
			_event_start_date,
			_event_end_date
		)
	) {
		$("#event_submit_error").addClass("text-danger fw-bold");
		$("#event_submit_error").html("Please correct the errors.");

		return false;
	}
	fetch("/api/events", {
		method: "POST",
		body: JSON.stringify({
			event_title: event_title,
			event_details: event_details,
			event_start_date: event_start_date_seq,
			event_end_date: event_end_date_seq,
		}),
		headers: { "Content-Type": "application/json" },
	})
		.then((data) => {
			console.log(data);
			document.location.replace("/event-manager");
		})
		.catch((err) => {
			console.log(err);
		});
}
function validateEventData(
	event_title,
	event_details,
	event_start_date,
	event_end_date
) {
	let rv = true;
	if ($("#event_end_time").val() == "") {
		$("#event_end_time").addClass("bg-danger fw-bold");
		//	alert("Please check time");
		rv = false;
	}
	if ($("#event_start_time").val() == "") {
		$("#event_start_time").addClass("bg-danger fw-bold");
		//	alert("Please check time");
		rv = false;
	}
	if (event_title == "") {
		$("#event_title").addClass("bg-danger fw-bold");
		rv = false;
	}
	if (event_details == "") {
		$("#event_details").addClass("bg-danger fw-bold");
		rv = false;
	}
	if (event_end_date.isBefore(event_start_date)) {
		$("#event_start_dt").style.background = "red";
		$("#event_end_dt").style.background = "red";
		//	alert("dates are ivalid");
		rv = false;
	}
	return rv;
}

//allInputs[i].value = ""

function changeBgColor(box) {
	console.log(box);
	console.log();
	//	this.style.backgroundColor = "white";
	box.classList.remove("bg-danger", "fw-bold");
}
$(document).ready(function () {
	$("#from_date").datepicker({
		duration: "fast",
		showAnim: "slideDown",
		showOptions: { direction: "up" },
		defaultDate: new Date(),
	});
	$("#from_date").datepicker("setDate", new Date());
	//  $("#from").on("change", function () {
	// 		var selected = $(this).val();
	// 		alert(selected);
	// 	});
	$("#to_date").datepicker({
		duration: "fast",
		showAnim: "slideDown",
		showOptions: { direction: "up" },
	});
	$("#to_date").datepicker("setDate", 15);
	$("#event_start_dt").datepicker({
		duration: "fast",
		showAnim: "slideDown",
		showOptions: { direction: "up" },
		minDate: new Date(),
	});
	$("#event_start_dt").datepicker("setDate", new Date());
	$("#event_end_dt").datepicker({
		duration: "fast",
		showAnim: "slideDown",
		showOptions: { direction: "up" },
		minDate: new Date(),
	});
	$("#event_end_dt").datepicker("setDate", new Date());
	console.log($("#viewEventsButton"));
	$("#viewEventsButton").on("click", viewEvents);
	$("#event_submit").on("click", eventformSubmitHandler);

	viewEvents();
});
// };
