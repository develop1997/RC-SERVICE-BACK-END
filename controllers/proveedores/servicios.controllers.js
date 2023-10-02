const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class ServiciosController {
	async getServicios(req, res, next) {
		try {
			const result = await db.Servicios.find({}).populate(
				"Categoria_Servicio"
			);

			res.status(200).send(result);
		} catch (error) {
			console.log(error);
		} finally {
			next();
		}
	}

	async getServicioPorId(req, res, next) {
		const id = req.params.id;

		try {
			const result = await db.Servicios.find({
				_id: new ObjectId(id),
			}).populate("Categoria_Servicio");

			res.status(200).send(result);
		} catch (error) {
			console.log("Error: " + error);
		} finally {
			next();
		}
	}

	//   ______________________________________________________________________________________

	async postServicio(req, res, next) {
		try {
			const result = new db.Servicios(req.body);
			await result.save();

			res.status(200).json({ message: "Documento creado exitosamente" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Error al crear el documento" });
		} finally {
			next();
		}
	}

	//______________________________________________________________________________________

	async putServicio(req, res, next) {
		const Update = req.body;
		const id = req.params.id;
		try {
			const result = await db.Servicios.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				Update,
				{ new: true } // Para obtener el documento actualizado en luxgar del antiguo
			);

			if (result) {
				res.status(200).json({
					message: "Documento actualizado exitosamente\n",
					result,
				});
			} else {
				res.status(500).json({
					error: "Error al actualizar el documento",
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			next();
		}
	}

	//______________________________________________________________________________________

	async deleteServicio(req, res, next) {
		const id = req.params.id;

		try {
			const reference = await db.Offers.find({
				id_service: new ObjectId(id),
			});

			console.log(reference);

			if (reference.length > 0) {
				res.status(500).send({
					error:
						"No se puede eliminar esta categoría, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.Servicios.findOneAndDelete({
					_id: new ObjectId(id),
				});

				if (result) {
					res.status(200).send({
						message: "Servicio borrado con éxito",
					});
				} else {
					res.status(500).send({
						error: "Error al eliminar el servicio",
					});
				}
			}
		} catch (error) {
			console.log("Error al eliminar el servicio -> " + error.message);
			res.status(500).send({ error: "Error al eliminar el servicio" });
		} finally {
			next();
		}
	}
}

module.exports = ServiciosController;
