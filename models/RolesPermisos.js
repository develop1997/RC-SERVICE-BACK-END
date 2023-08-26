/** @format */

const mongoose = require("mongoose");

const rolesPermisosSchema = new mongoose.Schema({
	id_rol: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
		required: true,
	},
	id_permiso: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Permiso",
		required: true,
	},
});

const RolesPermisos = mongoose.model("RolesPermiso", rolesPermisosSchema);

module.exports = RolesPermisos;
