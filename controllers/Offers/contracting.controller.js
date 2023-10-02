const { ObjectId } = require("mongodb");
const db = require("../../db/dbConfig");

class Contracting_Controller {
	getStatus(req, res, next) {
		db.Contracting.find()
			.populate("id_candidates")
			.populate("id_contractingStatus")
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((error) => {
				res.status(500).json({ error: "Error al obtener Estados" });
			})
			.finally(() => next());
	}

	postStatus(req, res, next) {
		const result = new db.Contracting(req.body);
		result
			.save()
			.then((result) => res.status(201).json(result))
			.catch((error) =>
				res.status(500).json({ Error: "ERROR CON ESTADO ***" })
			)
			.finally(() => next());
	}
	async getIdStatus(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Contracting.find({
				_id: new ObjectId(id),
			})
				.populate("id_candidates")
				.populate("id_contractingStatus");
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
	async putStatus(req, res, next) {
		const Update = req.body;
		const id = req.params.id;
		try {
			const result = await db.Contracting.findOneAndUpdate(
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
	async deleteStatus(req, res, next) {
		const id = req.params.id;
		try {
			const result = await db.Contracting.findOneAndDelete({
				_id: new ObjectId(id),
			});

			if (result) {
				res.status(200).send({ message: "Borrado con éxito", result });
			} else {
				res.status(500).send({ error: "Error al eliminar el archivo" });
			}
		} catch (error) {
			console.log(error);
		} finally {
			next();
		}
	}
}
module.exports = Contracting_Controller;
