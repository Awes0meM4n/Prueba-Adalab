const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const candidatesCollection = admin.firestore().collection('candidates');

exports.guardarCandidata = functions.https.onRequest((request, response) => {
  request.body.edad = calcularEdad(request.body.fechaNacimiento);
  console.log(JSON.stringify(request.body));
  candidatesCollection.add(request.body)
  .then(function(docRef) {
    response.send("Guardada " + JSON.stringify(request.body) + " | " + docRef.id);
  })
  .catch(function(error) {
    console.error("Error cargando candidata: ", error);
    response.redirect(404, "https://adalab.es/404");
  });
});

function calcularEdad(fechaNacimiento) {
  var today = new Date();
  var partes = fechaNacimiento.split('/');
  var birthDate = new Date(partes[2], partes[1] - 1, partes[0]);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
};
