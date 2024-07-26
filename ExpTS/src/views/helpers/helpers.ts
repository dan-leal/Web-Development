import { Prof, Tech } from "./helpersTypes"

export function listProfs(profs: Prof[]) {
  return `<ul>${profs.map(prof => `<li>${prof.name}</li>`).join('')}</ul>`;
}
