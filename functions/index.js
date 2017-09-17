const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.newList = functions.https.onRequest((req, res) => {
    const body = req.query;
    const name = body.name;
    const quantity = body.quantity;
    const shop = body.shop;
    const cr_date = new Date();
    const listName = body.listName;
    const shopping = {
        name,
        quantity,
        shop,
        cr_date
    };
    admin.database().ref('/lists/' + name).set(shopping).then(snapshot => {
        res.redirect(303, snapshot.ref);
    });
});

exports.watchList = functions.database.ref('/lists/{pushId}/shopping')
    .onWrite(event => {
        const shopping = event.data.val();
        console.log('Uppercasing', event.params.pushId, shopping);
        const uppercase = shopping.toUpperCase();
        return event.data.ref.parent.child('uppercase').set(uppercase);
    });

