import { Either } from "./Either";
import { parseInput } from "./logic";

export function update(output: HTMLOutputElement, input: string) {
  output.textContent = "";
  if (input === "") return;
  const sanitizedEither = parseInput(input);
  if (sanitizedEither.isLeft) {
    output.innerHTML = `<span class="erro">${sanitizedEither.leftValue}</span>`;
    return;
  }
  const numproc = sanitizedEither.rightValue;

  const map = new Map();
  map.set("Número do processo", numproc.formatado);
  map.set("Número sequencial", numproc.sequencial.txt);
  mmm(map, "Dígito verificador", numproc.digitoVerificador, (x) => x.txt);
  mmm(map, "Ano", numproc.ano, (x) => x.txt);
  mmm(
    map,
    "Segmento do Poder Judiciário",
    numproc.segmento,
    (segmento) => `${segmento.txt} - ${segmento.nome}`
  );
  if (numproc.tribunal) {
    mmm(
      map,
      "Tribunal",
      numproc.tribunal,
      (tribunal) => `${tribunal.txt} - ${tribunal.nome}`
    );
  }
  if (numproc.unidade) {
    mmm(map, "Unidade de origem", numproc.unidade, (unidade) => {
      if (unidade.nome) return `${unidade.txt} - ${unidade.nome}`;
      else return unidade.txt;
    });
  }
  let s = "<table>";
  for (const [key, value] of map.entries()) {
    s += `<tr><th>${key}:</th><td>${value}</td></tr>`;
  }
  s += "</table>";
  output.innerHTML = s;
}
export const nomePartes = [
  "Número sequencial",
  "Dígito verificador",
  "Ano",
  "Segmento do Poder Judiciário",
  "Tribunal",
  "Unidade de origem",
];

function mmm<T>(
  map: Map<string, string>,
  key: string,
  either: Either<string, T>,
  transform: (value: T) => string
) {
  if (either.isLeft) {
    map.set(key, `<span class="erro">${either.leftValue}</span>`);
  } else {
    const value = either.rightValue;
    map.set(key, transform(value));
  }
}
