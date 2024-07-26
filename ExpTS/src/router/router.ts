import { Router } from "express";
import { loremIpsum, LoremIpsum } from "lorem-ipsum";
const router = Router()

router.get("/hb1", (req, res) => {
  res.render("hb1", { mensagem: "Alguma Mensagem", layout: false });
})

router.get("/hb2", (req, res) => {
  res.render("hb2", {
    vencedorCaprichoso: false,
    layout: false
  })
})

router.get("/hb3", (req, res) => {
  const profs = [
    { name: "David Fernandes", room: 321 },
    { name: "Altigran Soares", room: 224 },
    { name: "Elaine Harada", room: 345 },
    { name: "Horácio Fernandes", room: 148 },
  ];
  res.render("hb3", {
    profs, layout: false
  })
})

router.get("/hb4", (req, res) => {
  const techs = [
    { name: "Express", type: "Framework", poweredByNodejs: true },
    { name: "Laravel", type: "Framework", poweredByNodejs: false },
    { name: "React", type: "Library", poweredByNodejs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodejs: true },
    { name: "Django", type: "Framework", poweredByNodejs: false },
    { name: "Docker", type: "Virtualization", poweredByNodejs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodejs: true },
  ];
  res.render("hb4", {
    techs, layout: false
  })
})

router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.get("/bem-vindo/:nome", (req, res) => {
  res.send(`Seja bem vindo(a) ${req.params.nome}`)
})

router.get("/lorem/:paragrafos", (req, res) => {
  const paragrafos = Number(req.params.paragrafos)
  const lorem = loremIpsum({
    count: paragrafos,                // Number of "words", "sentences", or "paragraphs"
    format: "html",         // "plain" or "html"
    paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
    paragraphUpperBound: 7,  // Max. number of sentences per paragarph.
    random: Math.random,     // A PRNG function
    sentenceLowerBound: 5,   // Min. number of words per sentence.
    sentenceUpperBound: 15,  // Max. number of words per sentence.
    suffix: "\r\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
    units: "paragraphs",      // paragraph(s), "sentence(s)", or "word(s)"
  })
  res.send(`${lorem}`)
})

router.get("/about", (req, res) => {
  res.send("Página about!");
});

export default router;
