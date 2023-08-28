/** @format */

const mongoose = require("mongoose");

const permisoSchema = new mongoose.Schema({
	permiso: {
		type: String,
		required: true,
		unique: true,
	},
});

permisoSchema.pre("remove", async function (next) {
	const UsersPermisos = mongoose.model("UsersPermiso");
	const RolesPermisos = mongoose.model("RolesPermiso");

	await UsersPermisos.deleteMany({ id_permiso: this._id });
	await RolesPermisos.deleteMany({ id_permiso: this._id });

	next();
});

const Permiso = mongoose.model("Permiso", permisoSchema);

module.exports = Permiso;
