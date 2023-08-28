/** @format */

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
	nombreRol: {
		type: String,
		required: true,
		unique: true,
	},
});

roleSchema.pre("remove", async function (next) {
	const RolesPermisos = mongoose.model("RolesPermiso");
	await RolesPermisos.deleteMany({ id_rol: this._id });
	next();
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
