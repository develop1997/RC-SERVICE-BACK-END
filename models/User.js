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

userSchema.pre("remove", async function (next) {
	const UsersPermiso = mongoose.model("UsersPermiso");
	await UsersPermiso.deleteMany({ id_usuario: this._id });
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
