const { IncomingWebhook } = require("@slack/webhook");
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

const loggerStream = {
  write: (message) => {
    webHook.send({
      text: message,
    });
    console.log("Obteniendo el log", message);
  },
};

module.exports = loggerStream;
