import { Request, Response, NextFunction } from "express";
import { promises as fsPromises } from 'fs';
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

function logger(type: "completo" | "simples") {
  if (type === "completo") {
    return (req: Request, res: Response, next: NextFunction) => {
      asyncWriteFile('../log/log.txt', `${(new Date()).toISOString()} ${req.url} ${req.method} ${req.httpVersion} ${req.get('User-Agent')} \n`)
      next();
    }
  }
  else {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log(`${(new Date()).toDateString()} ${req.url}`);
      asyncWriteFile("../log/log.txt", `${(new Date()).toISOString()} ${req.url} ${req.method}\n`);
      next();
    }
  }
}

async function asyncWriteFile(filename: string, data: any) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  try {
    await fsPromises.writeFile(join(__dirname, filename), data, {
      flag: 'a+',
    });

    const contents = await fsPromises.readFile(
      join(__dirname, filename),
      'utf-8',
    );

    return contents;
  } catch (err) {
    console.log(err);
    return 'Something went wrong';
  }
}

export default logger;
