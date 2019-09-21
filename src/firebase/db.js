import { db } from './firebase';

// Candidates API
const candidatesCollection = db.collection('candidates');

export const updateCandidate = (id, field) =>
  candidatesCollection
    .doc(id)
    .set(field, { merge: true })
    .then(() => getCandidate(id));

export const getCandidate = id =>
  candidatesCollection
    .doc(id)
    .get()
    .then(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

export const getCandidates = () =>
  candidatesCollection
    .get()
    .then((snapshot) => snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    .catch((err) => console.log('Error leyendo datos', err));
