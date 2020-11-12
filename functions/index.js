const functions = require('firebase-functions');

// http end-point request 1
exports.randomNumber = functions.https.onRequest((req, res) => {
	const number = Math.round(Math.random() * 100);
	res.send(number.toString());
});

// http end-point request 2
exports.toTheCovert = functions.https.onRequest((req, res) => {
	res.redirect('https://www.s3interdev.com/');
});

// http callable function
exports.sayHello = functions.https.onCall((data, context) => {
	const name = data.name;
	return `hello, ${name}`;
});
