const firebase = require('firebase/compat/app')
require('firebase/compat/firestore')

const firebaseConfig = {
	apiKey: 'AIzaSyCMoS_Q9zOOaJ4vgE5WIT3QiL_deQk2rc8',
	authDomain: 'atw3-9cd9a.firebaseapp.com',
	projectId: 'atw3-9cd9a',
	storageBucket: 'atw3-9cd9a.appspot.com',
	messagingSenderId: '704359043545',
	appId: '1:704359043545:web:22a8c4eb5e4369072bc9c8',
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

module.exports = db
