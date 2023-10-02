import { Either, Left, Right } from "./Either";

type Segmento = { nome: string; tribunais: Map<number, Tribunal> };
type Tribunal = { nome: string };
type NonEmpty<T> = [T, ...T[]];

export const nomePartes = [
  "Número sequencial",
  "Dígito verificador",
  "Ano",
  "Segmento do Poder Judiciário",
  "Tribunal",
  "Unidade de origem",
];
const estados =
  ",Acre,Alagoas,Amapá,Amazonas,Bahia,Ceará,Distrito Federal,Espírito Santo,Goiás,Maranhão,Mato Grosso,Mato Grosso do Sul,Minas Gerais,Pará,Paraíba,Paraná,Pernambuco,Piauí,Rio de Janeiro,Rio Grande do Norte,Rio Grande do Sul,Rondônia,Roraima,Santa Catarina,Sergipe,São Paulo,Tocantins".split(
    ","
  );

export const segmentos: Map<number, Segmento> = createMap(
  tp(1, {
    nome: "Supremo Tribunal Federal",
    tribunais: createMap(tp(0, { nome: "Supremo Tribunal Federal" })),
  }),
  tp(2, {
    nome: "Conselho Nacional de Justiça",
    tribunais: createMap(tp(0, { nome: "Conselho Nacional de Justiça" })),
  }),
  tp(3, {
    nome: "Superior Tribunal de Justiça",
    tribunais: createMap(tp(0, { nome: "Superior Tribunal de Justiça" })),
  }),
  tp(4, {
    nome: "Justiça Federal",
    tribunais: createMap(
      ...Array.from({ length: 6 }, (_, i) =>
        tp(i + 1, { nome: `Tribunal Regional Federal da ${i + 1}ª Região` })
      ),
      tp(90, { nome: "Conselho de Justiça Federal" })
    ),
  }),
  tp(5, {
    nome: "Justiça do Trabalho",
    tribunais: createMap(
      tp(0, { nome: "Tribunal Superior do Trabalho" }),
      ...Array.from({ length: 24 }, (_, i) =>
        tp(i + 1, { nome: `Tribunal Regional do Trabalho da ${i + 1}ª Região` })
      ),
      tp(90, { nome: "Conselho Superior da Justiça do Trabalho" })
    ),
  }),
  tp(6, {
    nome: "Justiça Eleitoral",
    tribunais: createMap(
      tp(0, { nome: "Tribunal Superior Eleitoral" }),
      ...Array.from({ length: 27 }, (_, i) =>
        tp(i + 1, {
          nome: `Tribunal Regional Eleitoral de(o)(a) ${estados[i + 1]}`,
        })
      )
    ),
  }),
  tp(7, {
    nome: "Justiça Militar da União",
    tribunais: createMap(
      tp(0, { nome: "Superior Tribunal Militar" }),
      ...Array.from({ length: 12 }, (_, i) =>
        tp(i + 1, {
          nome: `${i + 1}ª Circunscrição Judiciária Militar`,
        })
      )
    ),
  }),
  tp(8, {
    nome: "Justiça dos Estados e do Distrito Federal e Territórios",
    tribunais: createMap(
      ...Array.from({ length: 27 }, (_, i) =>
        tp(i + 1, {
          nome: `Tribunal de Justiça do Estado de(o)(a) ${estados[i + 1]}`,
        })
      )
    ),
  }),
  tp(9, {
    nome: "Justiça Militar Estadual",
    tribunais: createMap(
      ...Array.from([13, 21, 26], (num) =>
        tp(num, { nome: `Tribunal Militar do Estado de(o)(a) ${estados[num]}` })
      )
    ),
  })
);

const unidadesPR =
  "Curitiba,Londrina,Foz do Iguaçu,Maringá,Umuarama,Cascavel,Guarapuava,Francisco Beltrão,Paranaguá,Ponta Grossa,Campo Mourão,Paranavaí,Pato Branco,Jacarezinho,União da Vitória,Apucarana,Toledo,Guaíra,Ibaiti - Jacarezinho,Ibaiti - Londrina,Ibaiti - Ponta Grossa,Pitanga - Guarapuava,Pitanga - Campo Mourão,Pitanga - Apucarana,Wenceslau Braz - Jacarezinho,Wenceslau Braz - Ponta Grossa,Astorga - Londrina,Astorga - Maringá,Telêmaco Borba,Wenceslau Braz - Telêmaco Borba,Ibaiti - Telêmaco Borba,Arapongas,Pitanga,Ivaiporã".split(
    ","
  );
const unidadesRS =
  "Porto Alegre,Rio Grande,Santa Maria,Uruguaiana,Passo Fundo,Santo Ângelo,Santana do Livramento,Caxias do Sul,Novo Hamburgo,Bagé,Pelotas,Santa Cruz do Sul,Canoas,Bento Gonçalves,Lajeado,Santa Rosa,Cruz Alta,Erechim,Carazinho,Cachoeira do Sul,Santiago,Capão da Canoa,Gravataí,Alegrete,Montenegro,Santa Vitória do Palmar,Jaguarão,Palmeira das Missões,Vacaria,São Leopoldo,Frederico Westphalen,Soledade,Itaqui,Ijuí,São Borja,São Jerônimo,São Luiz Gonzaga,Camaquã,Gramado/Canela - Caxias,Torres,Gramado/Canela - Novo Hamburgo,Nova Prata".split(
    ","
  );
const unidadesSC =
  "Florianópolis,Joinville,Chapecó,Joaçaba,Criciúma,Blumenau,Lages,Tubarão,Itajaí,Jaraguá do Sul,São Miguel do Oeste,Caçador,Concórdia,Rio do Sul,Mafra,Brusque,Laguna,Araranguá,São Francisco do Sul,Videira - Caçador,Tijucas,Videira - Joaçaba".split(
    ","
  );
export const unidadesQuarta = new Map([
  tp(70, {
    nome: "Seção Judiciária do Paraná",
    unidades: new Map(unidadesPR.map((x, i) => tp(i, x))),
  }),
  tp(71, {
    nome: "Seção Judiciária do Rio Grande do Sul",
    unidades: new Map(unidadesRS.map((x, i) => tp(i, x))),
  }),
  tp(72, {
    nome: "Seção Judiciária de Santa Catarina",
    unidades: new Map(unidadesSC.map((x, i) => tp(i, x))),
  }),
  tp(80, {
    nome: "Processos administrativos (SEI!)",
    unidades: new Map(
      Array.from({ length: 4 }, (_, i) =>
        tp(i, "Processos administrativos (SEI!)")
      )
    ),
  }),
]);
export const unidadesTJSC =
  `,Abelardo Luz,Anchieta,Anita Garibaldi,Araranguá,Bal. Camboriú,Barra Velha,Biguaçu,Blumenau,Bom Retiro,Braço do Norte,Brusque,Caçador,Campo Erê,Campos Novos,Canoinhas,Capinzal,Dionísio Cerqueira,Chapecó,Concórdia,Criciúma,Cunha Porã,Curitibanos,Capital,Fraiburgo,Gaspar,Guaramirim,Ibirama,Içara,Imaruí,Imbituba,Indaial,Itaiópolis,Itajaí,Itapiranga,Ituporanga,Jaraguá do Sul,Joaçaba,Joinville,Lages,Laguna,Mafra,Maravilha,Mondaí,Orleans,Palhoça,Palmitos,Papanduva,Bal. Piçarras,Pinhalzinho,Pomerode,Ponte Serrada,Porto União,Quilombo,Rio do Sul,Rio Negrinho,Santa Cecília,Santo Amaro da Imperatriz,São Bento do Sul,São Carlos,São Domingos,São Francisco do Sul,São João Batista,São Joaquim,São José,São José do Cedro,São Lourenço do Oeste,São Miguel do Oeste,Seara,Sombrio,Taió,Tangará,Tijucas,Timbó,Trombudo Central,Tubarão,Turvo,Urubici,Urussanga,Videira,Xanxerê,Xaxim,Capital/Estreito,Correia Pinto,Descanso,Coronel Freitas,Otacílio Costa,Lauro Müller,Lebon Régis,,Capital/Norte da Ilha,Capital/Eduardo Luz,Capital/Bancário,,,,,,,,,,,Araquari,Ascurra,,,,,,,,,Camboriú,,,,,,Garuva,,,,,Itá,Itapema,Itapoá,,,,,,,,,Navegantes,,,,Porto Belo,,Presidente Getúlio,,Rio do Campo,Rio do Oeste,,,,,,,,,,,,,,,Armazém,,,,Capivari de Baixo,,,Forquilhinha,Garopaba,,,,,,,,Meleiro,,,,,,,,,,,,,,Santa Rosa do Sul,,,,,,,,,,,,,,,,,,,,,,,,,,,Campo Belo do Sul,,Catanduvas,,,,,,,,,,,,,,,,,Herval D'Oeste,,,,,,,Ipumirim,,,,,,,,,,,,,,Modelo,,,,,,,,,,,,,,,,,,,,,,,,,,Jaguaruna`.split(
    ","
  );

export function sanitize(numproc: string): Either<string, string> {
  const digitos = numproc.replace(/\D/g, "");
  if (digitos.length !== 20)
    return Left(`Número de processo precisa conter 20 dígitos: "${digitos}".`);
  return Right(digitos);
}

export function formatar(partes: string[]): string {
  return [partes.slice(0, 2).join("-")].concat(partes.slice(2)).join(".");
}

function createMap<a, b>(...tuples: [a, b][]) {
  return new Map(tuples);
}

function tp<a, b>(a: a, b: b): [a, b] {
  return [a, b];
}

export function formatarRanges(
  numbers: number[],
  format: (x: number) => string = (x) => `"${x.toString().padStart(2, "0")}"`
) {
  if (numbers.length < 1) throw new TypeError(`Array vazia.`);
  let ranges: NonEmpty<[number] | [number, number]> = [[numbers[0]]];
  for (let i = 1; i < numbers.length; i += 1) {
    const number = numbers[i];
    const lastRange = ranges[ranges.length - 1];
    const lastValue = lastRange[lastRange.length - 1];
    if (number === lastValue + 1) {
      ranges[ranges.length - 1][1] = number;
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
  const r1 = Number(numproc.slice(0, 7)) % 97;
  const r2 = Number(r1.toString() + numproc.slice(9, 16)) % 97;
  const r3 = Number(r2.toString() + numproc.slice(16) + "00") % 97;
  const correto = 98 - r3;
  const informado = Number(numproc.slice(7, 9));
  if (informado === correto) return Right(numproc);
  else
    return Left(
      numproc.slice(0, 7) +
        correto.toString().padStart(2, "0") +
        numproc.slice(9)
    );
}
