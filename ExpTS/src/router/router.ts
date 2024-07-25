import { Router } from "express";
import { loremIpsum, LoremIpsum } from "lorem-ipsum";
const router = Router()

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
