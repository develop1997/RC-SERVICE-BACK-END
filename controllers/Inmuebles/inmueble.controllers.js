const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class InmuebleControllers {
	getInmueble(req, res, next) {
		db.Inmueble.find({})
			.populate("id_propietario")
			.populate("id_encargado")
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((error) => {
				res.status(500).json({ error: "Error al obtener Estados" });
			})
			.finally(() => next());
	}

	postInmueble(req, res, next) {
		const result = new db.Inmueble(req.body);
		result
			.save()
			.then((data) =>
				res.status(201).json({ result: data, message: "Created" })
			)
			.catch((error) =>
				res.status(500).json({ Error: "ERROR CON ESTADO ***" })
			)
			.finally(() => next());
	}
	async getIdInmueble(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Inmueble.find({
				_id: new ObjectId(id),
			})
				.populate("id_propietario")
				.populate("id_encargado");
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send(
					"No se encontró ningún documento con el ID proporcionado."
				);
			}
		} catch (error) {
			console.log("error" + error);
		} finally {
			next();
		}
	}
	async putInmueble(req, res, next) {
		const Update = req.body;
		const id = req.params.id;
		try {
			const result = await db.Inmueble.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				Update,
				{ new: true } // Para obtener el documento actualizado en lugar del antiguo
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
	async deleteInmueble(req, res, next) {
		const id = req.params.id;

		try {
			const reference = await db.Offers.find({
				id_property: new ObjectId(id),
			});
			console.log(reference);
			if (reference.length > 0) {
				res.status(500).send({
					error:
						"No se puede eliminar este documento, ya que se utiliza en otra parte.",
				});
			} else {
				const result = await db.Inmueble.findOneAndDelete({
					_id: new ObjectId(id),
				});
				res.status(200).send({
					message: "Borrado con éxito",
					Result: result,
				});
			}
		} catch (error) {
			console.log("Error al eliminar el documento -> " + error.message);
			res.status(500).send({
				error: "error.",
			});
		} finally {
			next();
		}
	}
}
module.exports = InmuebleControllers;
