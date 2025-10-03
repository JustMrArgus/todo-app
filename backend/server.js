const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const port = process.env.APP_PORT || 3000;

const bootstrap = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on ${port}...`));
  } catch (err) {
    console.error("Server start error:", err);
  }
};

bootstrap();
