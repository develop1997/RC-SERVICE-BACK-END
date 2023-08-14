/** @format */

const mongoose = require("mongoose");

const rolesPermisosSchema = new mongoose.Schema({
	id_usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	id_permiso: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Permiso",
		required: true,
	},
});

const RolesPermisos = mongoose.model("RolesPermisos", rolesPermisosSchema);

module.exports = RolesPermisos;
