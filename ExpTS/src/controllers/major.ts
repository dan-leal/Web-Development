import { Request, Response } from "express"
import { createMajor, getMajor, getMajors } from "../service/major";

const index = async (req: Request, res: Response) => {
  try {
    const majors = await getMajors();
    res.render("major/index", { majors });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

const create = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("major/create");
  }
  if (req.method === "POST") {
    try {
      await createMajor(req.body);
      res.send("criado");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const major = await getMajor(id);
    res.render("major/read", { major })
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
const update = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const { id } = req.params;
    try {
      const major = await getMajor(id);
      res.render("major/update", { major })
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  // if (req.method === "POST") {
  //   try {
  //     const {id} = req.params
  //     const major = await getMajor(id);
  //     const newMajor = await updateMajor(id, req.body);
  //     res.render("major/update", { major })
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send(err);
  //   }
  // }

}
const remove = async (req: Request, res: Response) => { }

export default { index, create, update, read, remove }
