import { Either, Left, Right } from "./Either";
import {
  Ano,
  DigitoVerificador,
  NumProc,
  Segmento,
  Sequencial,
  Tribunal,
  Unidade,
} from "./NumProc";
import { segmentos } from "./cadastros";

type Repeat<T, N extends number, O extends T[] = []> = O extends { length: N }
  ? O
  : Repeat<T, N, [...O, T]>;

export function parseInput(input: string): Either<string, NumProc> {
  const semDigitos = input.replace(/^\D+/, "").replace(/\D+$/, "");
  const reText = "7,2,4,1,2,4"
    .split(",")
    .map((tam) => `(\\d{${tam}})`)
    .join(`(?:\\s*[-\\.]?\\s*)`);
  const re = new RegExp(`^${reText}$`);
  const valido = semDigitos.match(re);
  if (!valido) return Left(`Número de processo inválido: ${semDigitos}`);
  const numproc = valido.slice(1).join("");
  const formatado = formatarPartes(valido.slice(1));
  const [
    txtSequencial,
    txtDigitoVerificador,
    txtAno,
    txtSegmento,
    txtTribunal,
    txtUnidade,
  ] = valido.slice(1) as Repeat<string, 6>;
  const sequencial = ((): Sequencial => {
    const txt = txtSequencial;
    const num = Number(txt);
    return { txt, num };
  })();
  const digitoVerificador = ((): Either<string, DigitoVerificador> => {
    const txt = txtDigitoVerificador;
    const num = Number(txt);
    const resultado = validarDV(numproc);
    if (resultado.isLeft) {
      const digitoCorreto = resultado.leftValue.slice(7, 9);
      return Left(
        `Dígito verificador incorreto: "${txt}". Esperado: "${digitoCorreto}".`
      );
    }
    return Right({ txt, num });
  })();
  const ano = ((): Either<string, Ano> => {
    const txt = txtAno;
    const num = Number(txt);
    if (num < 1889) {
      return Left(`Ano inválido: "${num}".`);
    } else if (num > new Date().getFullYear() + 1) {
      return Left(`Ano inválido: "${num}".`);
    }
    return Right({ txt, num });
  })();
  const segmento = ((): Either<string, Segmento> => {
    const txt = txtSegmento;
    const num = Number(txt);
    const segmento = segmentos.get(num);
    if (!segmento)
      return Left(`Segmento inválido: "${txt}". Esperado: "1" a "9".`);
    return Right(segmento);
  })();
  const tribunal = ((): Either<string, Tribunal> | null => {
    if (segmento.isLeft) return null;
    const txt = txtTribunal;
    const num = Number(txt);
    const tribunais = segmento.rightValue.tribunais;
    const tribunal = tribunais.get(num);
    if (!tribunal)
      return Left(
        `Tribunal inválido: "${txt}". Esperado: ${formatarRanges(
          [...tribunais.keys()],
          (x) => `${x.toString().padStart(2, "0")}`
        )}.`
      );
    return Right(tribunal);
  })();
  const unidade = ((): Either<string, Unidade> | null => {
    if (tribunal === null || tribunal.isLeft) return null;
    const txt = txtUnidade;
    const num = Number(txt);
    const unidades = tribunal.rightValue.unidades;
    if (unidades) {
      const unidade = unidades.get(num);
      if (!unidade)
        return Left(
          `Unidade de origem inválida: "${txt}". Esperado: ${formatarRanges(
            [...unidades.keys()],
            (x) => `${x.toString().padStart(4, "0")}`
          )}.`
        );
      return Right(unidade);
    }
    const nomeUnidades = tribunal.rightValue.nomeUnidades;
    if (nomeUnidades) {
      return Right({ txt, num, nome: nomeUnidades(num) });
    }
    return Right({ txt, num });
  })();
  return Right({
    txt: numproc,
    formatado,
    sequencial,
    digitoVerificador,
    ano,
    segmento,
    tribunal,
    unidade,
  });
}

function formatarPartes(partes: string[]): string {
  return [partes.slice(0, 2).join("-")].concat(partes.slice(2)).join(".");
}

type NonEmpty<T> = [T, ...T[]];
function formatarRanges(
  numbers: number[],
  format: (x: number) => string = (x) => `"${x.toString().padStart(2, "0")}"`
) {
  if (numbers.length < 1) throw new TypeError(`Array vazia.`);
  const ranges: NonEmpty<[number] | [number, number]> = [[numbers[0]!]];
  for (let i = 1; i < numbers.length; i += 1) {
    const number = numbers[i]!;
    const lastRange = ranges[ranges.length - 1]!;
    const lastValue = lastRange[lastRange.length - 1]!;
    if (number === lastValue + 1) {
      lastRange[1] = number;
    } else {
      ranges.push([number]);
    }
  }
  return ranges
    .map((xs) => xs.map((x) => format(x)))
    .map((xs) => xs.join(" a "))
    .join(", ");
}

export function validarDV(numproc: string): Either<string, string> {
  const r1 = Number(`${numproc.slice(0, 7)}${numproc.slice(9, 12)}`) % 97;
  const r2 = Number(`${r1}${numproc.slice(12)}`) % 97;
  const r3 = Number(`${r2}${numproc.slice(7, 9)}`) % 97;
  if (r3 === 1) return Right(numproc);
  const correto = 98 - (Number(`${r2}00`) % 97);
  return Left(
    `${numproc.slice(0, 7)}${correto
      .toString()
      .padStart(2, "0")}${numproc.slice(9)}`
  );
}
