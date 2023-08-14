/** @format */
const db = require("./dbConfig");
const mongoose = require("mongoose");

async function seedDatabase() {
	try {
		// Crear roles
		const adminRole = await db.Role.create({ nombreRol: "Admin" });
		const userRole = await db.Role.create({ nombreRol: "User" });

		// Crear permisos
		const readPermission = await db.Permiso.create({ permiso: "Read" });
		const writePermission = await db.Permiso.create({ permiso: "Write" });

		// Crear usuarios con roles y permisos
		const adminUser = await db.User.create({
			correo: "admin@example.com",
			contraseña: "admin123",
			rol: adminRole._id,
		});

		await db.RolesPermisos.create({
			id_usuario: adminUser._id,
			id_permiso: readPermission._id,
		});

		await db.RolesPermisos.create({
			id_usuario: adminUser._id,
			id_permiso: writePermission._id,
		});

		const normalUser = await db.User.create({
			correo: "user@example.com",
			contraseña: "user123",
			rol: userRole._id,
		});

		await db.RolesPermisos.create({
			id_usuario: normalUser._id,
			id_permiso: readPermission._id,
		});

		console.log("Data seeded successfully");
	} catch (error) {
		console.error("Error seeding data:", error);
	} finally {
		mongoose.disconnect();
	}
}

seedDatabase();
