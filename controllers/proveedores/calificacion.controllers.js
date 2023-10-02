const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class CalificacionesController {
	async getCalificaciones(req, res, next) {
		try {
			const result = await db.Calificacion.find({});

			res.status(200).send(result);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: "Error al obtener las calificaciones",
			});
		} finally {
			next();
		}
	}

	//__________________________________________________________________________________________

	async getCalificacionPorId(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Calificacion.find({
				_id: new ObjectId(id),
			});

			res.status(200).send(result);
		} catch (error) {
			console.log("Error: " + error);
			res.status(500).json({ error: "Error al obtener la calificación" });
		} finally {
			next();
		}
	}

	//__________________________________________________________________________________________

	async postCalificacion(req, res, next) {
		try {
			const result = new db.Calificacion(req.body);
			await result.save();

			if (result) {
				res.status(200).json({
					message: "Calificación creada exitosamente",
				});
			} else {
				res.status(500).json({
					error: "Error al crear la calificación",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Error al crear la calificación" });
		} finally {
			next();
		}
	}

	//__________________________________________________________________________________________
	async putCalificacion(req, res, next) {
		const { Comentarios, CalificacionesFloat } = req.body;
		const id = req.params.id;
		try {
			const result = await db.Calificacion.updateOne(
				{ _id: new ObjectId(id) },
				{
					$set: {
						Comentarios: Comentarios,
						CalificacionesFloat: CalificacionesFloat,
					},
				}
			);
			if (result.modifiedCount === 1) {
				res.status(200).json({
					message: "Calificación actualizada exitosamente",
				});
			} else {
				res.status(500).json({
					error: "Error al actualizar la calificación",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: "Error al actualizar la calificación",
			});
		} finally {
			next();
		}
	}

	//__________________________________________________________________________________________

	async deleteCalificacion(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Calificacion.deleteOne({
				_id: new ObjectId(id),
			});

			if (result) {
				res.status(200).send({
					message: "Calificación borrada con éxito",
				});
			} else {
				res.status(500).send({
					error: "Error al eliminar la calificación",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({
				error: "Error al eliminar la calificación",
			});
		} finally {
			next();
		}
	}
}

module.exports = CalificacionesController;
