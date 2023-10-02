import { Either, Right } from "./Either";
import { h } from "./h";
import { parseInput } from "./parseInput";

export function update(
  output: HTMLOutputElement,
  inputElement: HTMLInputElement
) {
  const input = inputElement.value;
  output.textContent = "";
  if (input === "") return;
  const resultado = parseInput(input);
  if (resultado.isLeft) {
    output.append(
      h("p", {}, h("span", { className: "erro" }, resultado.leftValue))
    );
    const digitos = resultado.leftValue.replace(/\D/g, "");
    if (digitos.length === 21) {
      output.append(
        h(
          "p",
          {},
          "Há um dígito a mais. Sugestões de números válidos similares (clique para utilizar):"
        )
      );
      const possibilidades = new Set<string>();
      for (let i = 0; i < 21; i += 1) {
        const antes = digitos.slice(0, i);
        const depois = digitos.slice(i + 1, 21);
        const tentativa = `${antes}${depois}`;
        const resultado = parseInput(tentativa);
        if (resultado.isRight) {
          const { formatado, digitoVerificador, ano, unidade } =
            resultado.rightValue;
          if (
            digitoVerificador.isRight &&
            ano.isRight &&
            unidade &&
            unidade.isRight
          ) {
            possibilidades.add(formatado);
          }
        }
      }
      output.append(
        h(
          "ul",
          {},
          ...[...possibilidades].map((x) => h("li", {}, criarLink(x)))
        )
      );
    } else if (digitos.length === 19) {
      output.append(
        h(
          "p",
          {},
          "Há um dígito faltando. Sugestões de números válidos similares (clique para utilizar):"
        )
      );
      const possibilidades = new Set<string>();
      for (let i = 0; i < 20; i += 1) {
        const antes = digitos.slice(0, i);
        const depois = digitos.slice(i, 19);
        for (let j = 0; j < 10; j += 1) {
          const tentativa = `${antes}${j}${depois}`;
          const resultado = parseInput(tentativa);
          if (resultado.isRight) {
            const { formatado, digitoVerificador, ano, unidade } =
              resultado.rightValue;
            if (
              digitoVerificador.isRight &&
              ano.isRight &&
              unidade &&
              unidade.isRight
            )
              possibilidades.add(formatado);
          }
        }
      }
      output.append(
        h(
          "ul",
          {},
          ...[...possibilidades].map((x) => h("li", {}, criarLink(x)))
        )
      );
    }
    return;
  }

  const {
    txt: numproc,
    formatado,
    sequencial,
    digitoVerificador,
    ano,
    segmento,
    tribunal,
    unidade,
  } = resultado.rightValue;
  output.append(
    h(
      "table",
      {},
      h(
        "thead",
        {},
        h(
          "tr",
          null,
          ...Array.from(numproc, (x) => h("th", null, x)),
          h("td", null, "Número do processo: ", criarLink(formatado))
        )
      ),
      h(
        "tbody",
        null,
        criarLinha(
          numproc,
          0,
          7,
          Right(sequencial),
          (x) => `Número sequencial: ${x.num}`
        ),
        criarLinha(
          numproc,
          7,
          9,
          digitoVerificador,
          (x) => `Dígito verificador: ${x.txt}`
        ),
        criarLinha(numproc, 9, 13, ano, (x) => `Ano: ${x.num}`),
        criarLinha(
          numproc,
          13,
          14,
          segmento,
          (x) => `Segmento do Poder Judiciário: ${x.txt} - ${x.nome}`
        ),
        ...(tribunal
          ? [
              criarLinha(
                numproc,
                14,
                16,
                tribunal,
                (x) => `Tribunal: ${x.txt} - ${x.nome}`
              ),
            ]
          : []),
        ...(unidade
          ? [
              criarLinha(numproc, 16, 20, unidade, (x) => {
                if (x.nome) return `Unidade de origem: ${x.txt} - ${x.nome}`;
                else return `Unidade de origem: ${x.txt}`;
              }),
            ]
          : [])
      )
    )
  );

  function criarLink(numproc: string) {
    const span = h("span", { className: "clickable" }, numproc);
    span.addEventListener("click", () => {
      inputElement.value = numproc;
      inputElement.dispatchEvent(new Event("input"));
    });
    return span;
  }
}
function fromEither<T>(
  either: Either<string, T>,
  transform: (value: T) => string
) {
  if (either.isLeft) return h("span", { className: "erro" }, either.leftValue);
  else return transform(either.rightValue);
}

function criarCelulas(numproc: string, inicio: number, fim: number) {
  return [
    ...(inicio === 0 ? [] : [h("td", { colSpan: inicio })]),
    ...Array.from(numproc.slice(inicio, fim), (x) => h("td", null, x)),
    ...(fim === 20 ? [] : [h("td", { colSpan: 20 - fim })]),
  ];
}

function criarLinha<T>(
  numproc: string,
  start: number,
  end: number,
  campo: Either<string, T>,
  transform: (valor: T) => string
) {
  return h(
    "tr",
    null,
    ...criarCelulas(numproc, start, end),
    h("td", {}, fromEither(campo, transform))
  );
}
