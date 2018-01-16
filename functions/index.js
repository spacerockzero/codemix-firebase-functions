const functions = require('firebase-functions');
const lib = require('./lib');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from Firebase!');
});

exports.getNews = functions.https.onRequest((req, res) => {
  const topic = req.query.q;
  lib
    .getNews(topic)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});
