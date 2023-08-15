/** @format */

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

function formatPhoneNumber(phoneNumber) {
	let formattedNumber = phoneNumber.replace(/\D/g, "");
	formattedNumber += "@c.us";
	return formattedNumber;
}

/**
 * Envia un mensaje a un número de teléfono a través de WhatsApp.
 * @param {string} numero - El número de teléfono al que se enviará el mensaje.
 * @param {string} mensaje - El mensaje que se enviará.
 */
async function enviarMensaje(numero, mensaje) {
	try {
		const client = new Client({
			authStrategy: new LocalAuth({
				clientId: "VERIFICACION",
			}),
		});

		client.on("qr", (qr) => {
			console.log("Conectando");
			qrcode.generate(qr, { small: true });
		});
		client.on("ready", () => {
			console.log("Cliente listo");
		});

		await client.initialize();

		const numeroEstandarizado = formatPhoneNumber(numero);
		await client.sendMessage(numeroEstandarizado, mensaje).then((res) => {
			console.log("Mensaje enviado:", mensaje);
			setTimeout(() => {
				client.destroy();
			}, 5000);
		});
	} catch (error) {
		console.error("Error al enviar el mensaje:", error);
		return false;
	}
	return true;
}

module.exports = enviarMensaje;
