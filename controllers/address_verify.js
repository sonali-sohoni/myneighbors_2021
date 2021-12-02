const sssdk = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = sssdk.core;
const Lookup = sssdk.usStreet.Lookup;
require("dotenv").config();
//let authId = "d66b03f4-737b-002b-ed37-b9a9c1989b3e";
//let authToken = "MiuqCcCYwQdz2015keTl";
// let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials)
// 	.withBaseUrl("YOUR URL")
// 	.withLicenses(["us-rooftop-geocoding-cloud"]);
//**//const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);
const credentials = new SmartyStreetsCore.StaticCredentials(
	process.env.SS_AUTH_ID,
	process.env.SS_TOKEN
);
let client = SmartyStreetsCore.buildClient.usStreet(credentials);
// let client = clientBuilder.buildUsStreetApiClient();

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/us-street-api#input-fields

// let lookup1 = new Lookup();
// lookup1.inputId = "24601"; // Optional ID from your system
// lookup1.addressee = "John Doe";
// lookup1.street = "330 N 100 W";
// lookup1.street2 = "closet under the stairs";
// lookup1.secondary = "APT 2";
// lookup1.urbanization = ""; // Only applies to Puerto Rico addresses
// lookup1.city = "Provo";
// lookup1.state = "Utah";
// lookup1.zipCode = "84601";
// lookup1.maxCandidates = 3;
// lookup1.match = "invalid";

// let lookup2 = new Lookup();
// // lookup2.street = "1600 Amphitheater Pkwy";
// // lookup2.lastLine = "Mountainview, CA";
// // lookup2.maxCandidates = 5;
// lookup2.street = "1600 Adddmphitheater Pkwy";
// lookup2.lastLine = "Mountainview, CA";
// lookup2.maxCandidates = 5;

// let lookup3 = new Lookup();
// lookup3.inputId = "8675309";
// lookup3.street = "1600 Amphitheatre Parkway Mountain View, CA 94043";
// lookup3.maxCandidates = 1;

// // NOTE: batches are not supported when using SharedCredentials.
// let batch = new SmartyStreetsCore.Batch();
// batch.add(lookup1);
// batch.add(lookup2);
// batch.add(lookup3);
// client.send(lookup2).then(handleSuccess).catch(handleError);

function handleSuccess(response) {
	const data = response.lookups.map((lookup) => console.log(lookup.result));
	//console.log(data);
	return "result length ", response.lookups[0].result.length;
	//	return data.length;
}

function handleError(response) {
	console.log(response);
	return 0;
}

function verify_user_address(street, city, state, zip) {
	let lookup2 = new Lookup();
	lookup2.street = street;
	lookup2.lastLine = city + " , " + state;
	lookup2.zipCode = zip;
	lookup2.maxCandidates = 1;
	return client.send(lookup2).then(handleSuccess).catch(handleError);
}
console.log("VERIFY ADDRESS");
//verify_user_address("2914 abcd Chase Ln", "Katy", "TX", "77494");
module.exports = verify_user_address;
