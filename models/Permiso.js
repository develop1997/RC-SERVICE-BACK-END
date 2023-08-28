/** @format */

const mongoose = require("mongoose");

const permisoSchema = new mongoose.Schema({
	permiso: {
		type: String,
		required: true,
		unique: true,
	},
});

const Permiso = mongoose.model("Permiso", permisoSchema);

module.exports = Permiso;
