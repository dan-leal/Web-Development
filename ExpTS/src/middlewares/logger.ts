import { Request, Response, NextFunction } from "express";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

function logger(type: "completo" | "simples") {
  if (type === "completo") {
    return (req: Request, res: Response, next: NextFunction) => {
      syncWriteFile('../log/log.txt', `${(new Date()).toISOString()} ${req.url} ${req.method} ${req.httpVersion} ${req.get('User-Agent')} \n`)
    }
  }
  else {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log(`${(new Date()).toDateString()} ${req.url}`);
      syncWriteFile("../log/log.txt", `${(new Date()).toISOString()} ${req.url} ${req.method}\n`)
    }
  }
}

function syncWriteFile(filename: string, data: any) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  writeFileSync(join(__dirname, filename), data, {
    flag: 'a+',
  });

  const contents = readFileSync(join(__dirname, filename), 'utf-8');

  return contents;
}


export default logger;
