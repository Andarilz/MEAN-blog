const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const config = require('../config/db');

const userSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	login: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

const User = module.exports = mongoose.model('User', userSchema);


module.exports.getUserByLogin = (login, callback) => {
	// const query = {login};
	User.findOne({login}, callback);
}

module.exports.getUserById = (id, callback) => {
	User.findOById(id, callback);
}

module.exports.addUser = (newUser, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if(err) throw err
			// Store hash in your password DB.
			newUser.password = hash;
			newUser.save(callback);
		});
	});

}

module.exports.comparePass = (passwordUser, userDBpass, callback) => {
	bcrypt.compare(passwordUser, userDBpass, (err, isMatch) => {
		if(err) throw err
		callback(null, isMatch)
	})
}