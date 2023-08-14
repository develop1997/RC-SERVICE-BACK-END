/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	correo: {
		type: String,
		required: true,
		unique: true,
	},
	contraseña: {
		type: String,
		required: true,
	},
	rol: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
		required: true,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
