import { Request, Response } from "express"
import { loremIpsum } from "lorem-ipsum";
const hb1 = (req: Request, res: Response) => {
  res.render("main/hb1", { mensagem: "Alguma Mensagem", layout: false });
}

const hb2 = (req: Request, res: Response) => {
  res.render("main/hb2", {
    vencedorCaprichoso: false,
    layout: false
  })
}

const hb3 = (req: Request, res: Response) => {
  const profs = [
    { name: "David Fernandes", room: 321 },
    { name: "Altigran Soares", room: 224 },
    { name: "Elaine Harada", room: 345 },
    { name: "Horácio Fernandes", room: 148 },
  ];
  res.render("main/hb3", {
    profs, layout: false
  })
}

const hb4 = (req: Request, res: Response) => {
  const techs = [
    { name: "Express", type: "Framework", poweredByNodejs: true },
    { name: "Laravel", type: "Framework", poweredByNodejs: false },
    { name: "React", type: "Library", poweredByNodejs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodejs: true },
    { name: "Django", type: "Framework", poweredByNodejs: false },
    { name: "Docker", type: "Virtualization", poweredByNodejs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodejs: true },
  ];
  res.render("main/hb4", {
    techs, layout: false
  })
}

const bemvindo = (req: Request, res: Response) => {
  res.send(`Seja bem vindo(a) ${req.params.nome}`)
}

const about = (req: Request, res: Response) => {
  res.send("Página about!");
}

const hello = (req: Request, res: Response) => {
  res.send("Hello world!");
}

const paragrafos = (req: Request, res: Response) => {
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
}

export default { hb1, hb2, hb3, hb4, bemvindo, about, hello, paragrafos };
