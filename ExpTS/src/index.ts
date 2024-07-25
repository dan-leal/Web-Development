import express, { Request, Response } from "express";
import dotenv from "dotenv";

import router from "./router/router"
import logger from "./middlewares/logger";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(logger("simples"));

app.use("/img", express.static(`${__dirname}/../public/img`));
app.use(router);

app.get("/google", (req, res) => {
  res.redirect("http://google.com");
})

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
