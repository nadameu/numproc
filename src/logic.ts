import { Either, Left, Right } from "./Either";
import {
  Ano,
  DigitoVerificador,
  NumProc,
  Parte,
  Segmento,
  Sequencial,
  Tribunal,
  Unidade,
} from "./NumProc";

type NonEmpty<T> = [T, ...T[]];

const estados =
  ",Acre,Alagoas,Amapá,Amazonas,Bahia,Ceará,Distrito Federal,Espírito Santo,Goiás,Maranhão,Mato Grosso,Mato Grosso do Sul,Minas Gerais,Pará,Paraíba,Paraná,Pernambuco,Piauí,Rio de Janeiro,Rio Grande do Norte,Rio Grande do Sul,Rondônia,Roraima,Santa Catarina,Sergipe,São Paulo,Tocantins".split(
    ","
  );

function createUnidade(num: number, nome: string): Unidade {
  return { num, txt: num.toString().padStart(4, "0"), nome };
}
function createTribunal(
  num: number,
  nome: string,
  unidades?: Map<number, Unidade>
): Tribunal {
  return { num, txt: num.toString().padStart(2, "0"), nome, unidades };
}
function createSegmento(
  num: number,
  nome: string,
  tribunais: Map<number, Tribunal>
): Segmento {
  return { num, txt: String(num), nome, tribunais };
}
function createPartes<T extends Parte>(...partes: T[]): Map<number, T> {
  return new Map(partes.map((p) => [p.num, p]));
}

export const segmentos = createPartes(
  createSegmento(
    1,
    "Supremo Tribunal Federal",
    createPartes(createTribunal(0, "Supremo Tribunal Federal"))
  ),
  createSegmento(
    2,
    "Conselho Nacional de Justiça",
    createPartes(createTribunal(0, "Conselho Nacional de Justiça"))
  ),
  createSegmento(
    3,
    "Superior Tribunal de Justiça",
    createPartes(createTribunal(0, "Superior Tribunal de Justiça"))
  ),
  createSegmento(
    4,
    "Justiça Federal",
    createPartes(
      ...Array.from({ length: 6 }, (_, i) =>
        createTribunal(i + 1, `Tribunal Regional Federal da ${i + 1}ª Região`)
      ),
      createTribunal(90, "Conselho de Justiça Federal")
    )
  ),
  createSegmento(
    5,
    "Justiça do Trabalho",
    createPartes(
      createTribunal(0, "Tribunal Superior do Trabalho"),
      ...Array.from({ length: 24 }, (_, i) =>
        createTribunal(
          i + 1,
          `Tribunal Regional do Trabalho da ${i + 1}ª Região`
        )
      ),
      createTribunal(90, "Conselho Superior da Justiça do Trabalho")
    )
  ),
  createSegmento(
    6,
    "Justiça Eleitoral",
    createPartes(
      createTribunal(0, "Tribunal Superior Eleitoral"),
      ...Array.from({ length: 27 }, (_, i) =>
        createTribunal(
          i + 1,
          `Tribunal Regional Eleitoral de(o)(a) ${estados[i + 1]}`
        )
      )
    )
  ),
  createSegmento(
    7,
    "Justiça Militar da União",
    createPartes(
      createTribunal(0, "Superior Tribunal Militar"),
      ...Array.from({ length: 12 }, (_, i) =>
        createTribunal(i + 1, `${i + 1}ª Circunscrição Judiciária Militar`)
      )
    )
  ),
  createSegmento(
    8,
    "Justiça dos Estados e do Distrito Federal e Territórios",
    createPartes(
      ...Array.from({ length: 27 }, (_, i) =>
        createTribunal(
          i + 1,
          `Tribunal de Justiça do Estado de(o)(a) ${estados[i + 1]}`
        )
      )
    )
  ),
  createSegmento(
    9,
    "Justiça Militar Estadual",
    createPartes(
      ...Array.from([13, 21, 26], (num) =>
        createTribunal(
          num,
          `Tribunal Militar do Estado de(o)(a) ${estados[num]}`
        )
      )
    )
  )
);

interface Secao {
  prefixo: number;
  nome: string;
  unidades: string[];
}
const secoesQuarta: Secao[] = [
  {
    prefixo: 70,
    nome: "Seção Judiciária do Paraná",
    unidades:
      "Curitiba,Londrina,Foz do Iguaçu,Maringá,Umuarama,Cascavel,Guarapuava,Francisco Beltrão,Paranaguá,Ponta Grossa,Campo Mourão,Paranavaí,Pato Branco,Jacarezinho,União da Vitória,Apucarana,Toledo,Guaíra,Ibaiti - Jacarezinho,Ibaiti - Londrina,Ibaiti - Ponta Grossa,Pitanga - Guarapuava,Pitanga - Campo Mourão,Pitanga - Apucarana,Wenceslau Braz - Jacarezinho,Wenceslau Braz - Ponta Grossa,Astorga - Londrina,Astorga - Maringá,Telêmaco Borba,Wenceslau Braz - Telêmaco Borba,Ibaiti - Telêmaco Borba,Arapongas,Pitanga,Ivaiporã".split(
        ","
      ),
  },
  {
    prefixo: 71,
    nome: "Seção Judiciária do Rio Grande do Sul",
    unidades:
      "Porto Alegre,Rio Grande,Santa Maria,Uruguaiana,Passo Fundo,Santo Ângelo,Santana do Livramento,Caxias do Sul,Novo Hamburgo,Bagé,Pelotas,Santa Cruz do Sul,Canoas,Bento Gonçalves,Lajeado,Santa Rosa,Cruz Alta,Erechim,Carazinho,Cachoeira do Sul,Santiago,Capão da Canoa,Gravataí,Alegrete,Montenegro,Santa Vitória do Palmar,Jaguarão,Palmeira das Missões,Vacaria,São Leopoldo,Frederico Westphalen,Soledade,Itaqui,Ijuí,São Borja,São Jerônimo,São Luiz Gonzaga,Camaquã,Gramado/Canela - Caxias,Torres,Gramado/Canela - Novo Hamburgo,Nova Prata".split(
        ","
      ),
  },
  {
    prefixo: 72,
    nome: "Seção Judiciária de Santa Catarina",
    unidades:
      "Florianópolis,Joinville,Chapecó,Joaçaba,Criciúma,Blumenau,Lages,Tubarão,Itajaí,Jaraguá do Sul,São Miguel do Oeste,Caçador,Concórdia,Rio do Sul,Mafra,Brusque,Laguna,Araranguá,São Francisco do Sul,Videira - Caçador,Tijucas,Videira - Joaçaba".split(
        ","
      ),
  },
];
segmentos.get(4)!.tribunais.get(4)!.unidades = createPartes(
  ...secoesQuarta.flatMap((secao) =>
    unidadesFromNomes(
      secao.unidades,
      (num) => secao.prefixo * 100 + num,
      (nome) => `${secao.nome} - ${nome}`
    )
  ),
  ...Array.from({ length: 4 }, (_, i) =>
    createUnidade(8000 + i, "Processos administrativos (SEI!)")
  )
);
const cidadesSC =
  `,Abelardo Luz,Anchieta,Anita Garibaldi,Araranguá,Bal. Camboriú,Barra Velha,Biguaçu,Blumenau,Bom Retiro,Braço do Norte,Brusque,Caçador,Campo Erê,Campos Novos,Canoinhas,Capinzal,Dionísio Cerqueira,Chapecó,Concórdia,Criciúma,Cunha Porã,Curitibanos,Capital,Fraiburgo,Gaspar,Guaramirim,Ibirama,Içara,Imaruí,Imbituba,Indaial,Itaiópolis,Itajaí,Itapiranga,Ituporanga,Jaraguá do Sul,Joaçaba,Joinville,Lages,Laguna,Mafra,Maravilha,Mondaí,Orleans,Palhoça,Palmitos,Papanduva,Bal. Piçarras,Pinhalzinho,Pomerode,Ponte Serrada,Porto União,Quilombo,Rio do Sul,Rio Negrinho,Santa Cecília,Santo Amaro da Imperatriz,São Bento do Sul,São Carlos,São Domingos,São Francisco do Sul,São João Batista,São Joaquim,São José,São José do Cedro,São Lourenço do Oeste,São Miguel do Oeste,Seara,Sombrio,Taió,Tangará,Tijucas,Timbó,Trombudo Central,Tubarão,Turvo,Urubici,Urussanga,Videira,Xanxerê,Xaxim,Capital/Estreito,Correia Pinto,Descanso,Coronel Freitas,Otacílio Costa,Lauro Müller,Lebon Régis,,Capital/Norte da Ilha,Capital/Eduardo Luz,Capital/Bancário,,,,,,,,,,,Araquari,Ascurra,,,,,,,,,Camboriú,,,,,,Garuva,,,,,Itá,Itapema,Itapoá,,,,,,,,,Navegantes,,,,Porto Belo,,Presidente Getúlio,,Rio do Campo,Rio do Oeste,,,,,,,,,,,,,,,Armazém,,,,Capivari de Baixo,,,Forquilhinha,Garopaba,,,,,,,,Meleiro,,,,,,,,,,,,,,Santa Rosa do Sul,,,,,,,,,,,,,,,,,,,,,,,,,,,Campo Belo do Sul,,Catanduvas,,,,,,,,,,,,,,,,,Herval D'Oeste,,,,,,,Ipumirim,,,,,,,,,,,,,,Modelo,,,,,,,,,,,,,,,,,,,,,,,,,,Jaguaruna`.split(
    ","
  );
segmentos.get(8)!.tribunais.get(24)!.unidades = createPartes(
  ...unidadesFromNomes(cidadesSC)
);

function unidadesFromNomes(
  nomes: string[],
  transformNum: (x: number) => number = (x) => x,
  transformNome: (x: string) => string = (x) => x
): Unidade[] {
  return nomes
    .map((nome, num) => {
      if (nome === "") return null;
      return createUnidade(transformNum(num), transformNome(nome));
    })
    .filter(<T>(x: T | null): x is T => x !== null);
}

export function sanitize(numproc: string): Either<string, NumProc> {
  const semDigitos = numproc.replace(/(^\D+|\D+$)/g, "");
  const re = new RegExp(
    "^" +
      "seq:7,dv:2,ano:4,seg:1,tr:2,un:4"
        .split(",")
        .map((x) => x.split(":") as [string, string])
        .map(([nome, tam]) => `(?<${nome}>\\d{${tam}})`)
        .join(`(?:\\s*[-\\.]?\\s*)`) +
      "$"
  );
  const valido = semDigitos.match(re);
  if (!valido) return Left(`Número de processo inválido: ${semDigitos}`);
  const txt = valido.slice(1).join("");
  const formatado = formatar(valido.slice(1));
  const partes = valido.groups as unknown as {
    seq: string;
    dv: string;
    ano: string;
    seg: string;
    tr: string;
    un: string;
  };
  const sequencial = ((): Sequencial => {
    const txt = partes.seq;
    const num = Number(txt);
    return { txt, num };
  })();
  const digitoVerificador = ((): DigitoVerificador => {
    const txt = partes.dv;
    const num = Number(txt);
    return { txt, num };
  })();
  const ano = ((): Either<string, Ano> => {
    const txt = partes.ano;
    const num = Number(txt);
    if (num < 1889) {
      return Left(`Ano inválido: "${num}".`);
    } else if (num > new Date().getFullYear() + 1) {
      return Left(`Ano inválido: "${num}".`);
    }
    return Right({ txt, num });
  })();
  const segmento = ((): Either<string, Segmento> => {
    const txt = partes.seg;
    const num = Number(txt);
    const segmento = segmentos.get(num);
    if (!segmento)
      return Left(`Segmento inválido: "${txt}". Esperado: "1" a "9".`);
    return Right(segmento);
  })();
  const tribunal = ((): Either<string, Tribunal> | null => {
    if (segmento.isLeft) return null;
    const txt = partes.tr;
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
    const txt = partes.un;
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
    return Right({ txt, num, nome: txt });
  })();
  return Right({
    txt,
    formatado,
    sequencial,
    digitoVerificador,
    ano,
    segmento,
    tribunal,
    unidade,
  });
}

export function formatar(partes: string[]): string {
  return [partes.slice(0, 2).join("-")].concat(partes.slice(2)).join(".");
}

export function formatarRanges(
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
