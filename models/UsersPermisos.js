/** @format */

const mongoose = require("mongoose");

const usersPermisosSchema = new mongoose.Schema({
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

const UsersPermiso = mongoose.model("UsersPermiso", usersPermisosSchema);

module.exports = UsersPermiso;
