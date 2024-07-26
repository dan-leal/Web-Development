import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import sass from "node-sass-middleware"

import router from "./router/router"
import logger from "./middlewares/logger";
import { dirname } from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.engine("handlebars",
  engine({ helpers: require(`${__dirname}/views/helpers/helpers.ts`) }));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(sass({
  src: `${dirname}/../public/scss`,
  dest: `${dirname}/../public/css`,
  outputStyle: "compressed",
  prefix: "/css",
}));

app.use("/css", express.static(`${__dirname}/../public/css`));

app.use(logger("simples"));
app.use("/img", express.static(`${__dirname}/../public/img`));
app.use(router);
app.locals.valor = "10";

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
