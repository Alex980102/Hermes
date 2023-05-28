const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const axios = require("axios"); // Importa axios

require("dotenv").config();
console.log(process.env.API_URL);

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  if (msg.from == "status@broadcast") {
    return;
  }
  let user_id = msg.from;
  console.log(user_id);

  // Simula que el bot está escribiendo una respuesta
  const chat = await msg.getChat();
  chat.sendStateTyping();

  // Envía una solicitud POST a tu API de FastAPI
  try {
    const response = await axios.post(`${process.env.API_URL}/message/`, {
      user_id: user_id,
      message: msg.body,
    });

    // Detiene la simulación de escritura
    chat.clearState();

    console.log(response.data);

    // Envía la respuesta del asistente al cliente de WhatsApp
    if (response.data && response.data.message) {
      await msg.reply(response.data.message);
    } else {
      console.error("Error al obtener la respuesta del asistente");
      await msg.reply(
        "Error al comunicarse con nuestro asistente me podrías escribir otra vez tu pregunta?"
      );
    }
  } catch (error) {
    // Detiene la simulación de escritura
    chat.clearState();
    console.error("Error al comunicarse con la API:", error);
    await msg.reply(
      "Error al comunicarse con nuestro asistente me podrías escribir otra vez tu pregunta?"
    );
  }
});

client.initialize();
