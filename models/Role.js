/** @format */

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
	nombreRol: {
		type: String,
		required: true,
		unique: true,
	},
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;