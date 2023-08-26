/** @format */

const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.MG_DATABASE_LINK;

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = {
	User: require("../models/User"),
	Role: require("../models/Role"),
	RolesPermisos: require("../models/RolesPermisos"),
	Permiso: require("../models/Permiso"),
	UsersPermiso: require("../models/UsersPermisos"),
};
