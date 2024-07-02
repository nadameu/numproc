import { Parte, Segmento, Tribunal, Unidade } from "./NumProc";

const CSV_Estados =
  ",Acre,Alagoas,Amapá,Amazonas,Bahia,Ceará,Distrito Federal,Espírito Santo,Goiás,Maranhão,Mato Grosso,Mato Grosso do Sul,Minas Gerais,Pará,Paraíba,Paraná,Pernambuco,Piauí,Rio de Janeiro,Rio Grande do Norte,Rio Grande do Sul,Rondônia,Roraima,Santa Catarina,Sergipe,São Paulo,Tocantins";
export const estados = CSV_Estados.split(",");
const CSV_Subsecoes_PR =
  "Curitiba,Londrina,Foz do Iguaçu,Maringá,Umuarama,Cascavel,Guarapuava,Francisco Beltrão,Paranaguá,Ponta Grossa,Campo Mourão,Paranavaí,Pato Branco,Jacarezinho,União da Vitória,Apucarana,Toledo,Guaíra,Ibaiti - Jacarezinho,Ibaiti - Londrina,Ibaiti - Ponta Grossa,Pitanga - Guarapuava,Pitanga - Campo Mourão,Pitanga - Apucarana,Wenceslau Braz - Jacarezinho,Wenceslau Braz - Ponta Grossa,Astorga - Londrina,Astorga - Maringá,Telêmaco Borba,Wenceslau Braz - Telêmaco Borba,Ibaiti - Telêmaco Borba,Arapongas,Pitanga,Ivaiporã";
const CSV_Subsecoes_RS =
  "Porto Alegre,Rio Grande,Santa Maria,Uruguaiana,Passo Fundo,Santo Ângelo,Santana do Livramento,Caxias do Sul,Novo Hamburgo,Bagé,Pelotas,Santa Cruz do Sul,Canoas,Bento Gonçalves,Lajeado,Santa Rosa,Cruz Alta,Erechim,Carazinho,Cachoeira do Sul,Santiago,Capão da Canoa,Gravataí,Alegrete,Montenegro,Santa Vitória do Palmar,Jaguarão,Palmeira das Missões,Vacaria,São Leopoldo,Frederico Westphalen,Soledade,Itaqui,Ijuí,São Borja,São Jerônimo,São Luiz Gonzaga,Camaquã,Gramado/Canela - Caxias,Torres,Gramado/Canela - Novo Hamburgo,Nova Prata";
const CSV_Subsecoes_SC =
  "Florianópolis,Joinville,Chapecó,Joaçaba,Criciúma,Blumenau,Lages,Tubarão,Itajaí,Jaraguá do Sul,São Miguel do Oeste,Caçador,Concórdia,Rio do Sul,Mafra,Brusque,Laguna,Araranguá,São Francisco do Sul,Videira - Caçador,Tijucas,Videira - Joaçaba";
const CSV_Foruns_TJSC = `,Abelardo Luz,Anchieta,Anita Garibaldi,Araranguá,Bal. Camboriú,Barra Velha,Biguaçu,Blumenau,Bom Retiro,Braço do Norte,Brusque,Caçador,Campo Erê,Campos Novos,Canoinhas,Capinzal,Dionísio Cerqueira,Chapecó,Concórdia,Criciúma,Cunha Porã,Curitibanos,Capital,Fraiburgo,Gaspar,Guaramirim,Ibirama,Içara,Imaruí,Imbituba,Indaial,Itaiópolis,Itajaí,Itapiranga,Ituporanga,Jaraguá do Sul,Joaçaba,Joinville,Lages,Laguna,Mafra,Maravilha,Mondaí,Orleans,Palhoça,Palmitos,Papanduva,Bal. Piçarras,Pinhalzinho,Pomerode,Ponte Serrada,Porto União,Quilombo,Rio do Sul,Rio Negrinho,Santa Cecília,Santo Amaro da Imperatriz,São Bento do Sul,São Carlos,São Domingos,São Francisco do Sul,São João Batista,São Joaquim,São José,São José do Cedro,São Lourenço do Oeste,São Miguel do Oeste,Seara,Sombrio,Taió,Tangará,Tijucas,Timbó,Trombudo Central,Tubarão,Turvo,Urubici,Urussanga,Videira,Xanxerê,Xaxim,Capital/Estreito,Correia Pinto,Descanso,Coronel Freitas,Otacílio Costa,Lauro Müller,Lebon Régis,,Capital/Norte da Ilha,Capital/Eduardo Luz,Capital/Bancário,,,,,,,,,,,Araquari,Ascurra,,,,,,,,,Camboriú,,,,,,Garuva,,,,,Itá,Itapema,Itapoá,,,,,,,,,Navegantes,,,,Porto Belo,,Presidente Getúlio,,Rio do Campo,Rio do Oeste,,,,,,,,,,,,,,,Armazém,,,,Capivari de Baixo,,,Forquilhinha,Garopaba,,,,,,,,Meleiro,,,,,,,,,,,,,,Santa Rosa do Sul,,,,,,,,,,,,,,,,,,,,,,,,,,,Campo Belo do Sul,,Catanduvas,,,,,,,,,,,,,,,,,Herval D'Oeste,,,,,,,Ipumirim,,,,,,,,,,,,,,Modelo,,,,,,,,,,,,,,,,,,,,,,,,,,Jaguaruna`;
const CSV_Foruns_TJRS =
  ",Porto Alegre - Foro Central,Foro de Alegrete,Foro de Alvorada,Foro de Bagé,Foro de Bento Gonçalves,Foro de Cachoeira do Sul,Foro de Camaquã,Foro de Canoas,Foro de Carazinho,Foro de Caxias do Sul,Foro de Cruz Alta,Foro de Dom Pedrito,Foro de Erechim,Foro de Esteio,Foro de Gravataí,Foro de Ijuí,Foro de Lajeado,Foro de Montenegro,Foro de Novo Hamburgo,Foro de Palmeira das Missões,Foro de Passo Fundo,Foro de Pelotas,Foro de Rio Grande,Foro de Rio Pardo,Foro de Santana do Livramento,Foro de Santa Cruz do Sul,Foro de Santa Maria,Foro de Santa Rosa,Foro de Santo Ângelo,Foro de São Borja,Foro de São Gabriel,Foro de São Jerônimo,Foro de São Leopoldo,Foro de São Luiz Gonzaga,Foro de Sapucaia do Sul,Foro de Soledade,Foro de Uruguaiana,Foro de Vacaria,Foro de Viamão,Foro de Caçapava do Sul,Foro de Canela,Foro de Canguçu,Foro de Cerro Largo,Foro de Encantado,Foro de Encruzilhada do Sul,Foro de Espumoso,Foro de Estrela,Foro de Farroupilha,Foro de Frederico Westphalen,Foro de Getúlio Vargas,Foro de Garibaldi,Foro de Guaíba,Foro de Guaporé,Foro de Itaqui,Foro de Jaguarão,Foro de Júlio de Castilhos,Foro de Lagoa Vermelha,Foro de Nova Prata,Foro de Osório,Foro de Panambi,Foro de Quaraí,Foro de Rosário do Sul,Foro de Santa Vitória do Palmar,Foro de Santiago,Foro de Santo Antônio da Patrulha,Foro de São Francisco de Paula,Foro de São Lourenço do Sul,Foro de São Sebastião do Caí,Foro de Sarandi,Foro de Taquara,Foro de Taquari,Foro de Torres,Foro de Tramandaí,Foro de Três de Maio,Foro de Três Passos,Foro de Tupanciretã,Foro de Venâncio Aires,Foro de Veranópolis,Foro de Antônio Prado,Foro de Arroio do Meio,Foro de Arroio Grande,Foro de Arvorezinha,Foro de Bom Jesus,Foro de Butiá,Foro de Cacequi,Foro de Cachoeirinha,Foro de Campo Bom,Foro de Campo Novo,Foro de Candelária,Foro de Casca,Foro de Catuípe,Foro de Constantina,Foro de Coronel Bicaco,Foro de Crissiumal,Foro de Estância Velha,Foro de Faxinal do Soturno,Foro de Flores da Cunha,Foro de Gaurama,Foro de General Câmara,Foro de Giruá,Foro de Gramado,Foro de Guarani das Missões,Foro de Herval,Foro de Horizontina,Foro de Ibirubá,Foro de Iraí,Foro de Jaguari,Foro de Lavras do Sul,Foro de Marau,Foro de Marcelino Ramos,Foro de Mostardas,Foro de Não-Me-Toque,Foro de Nonoai,Foro de Nova Petrópolis,Foro de Pedro Osório,Foro de Planalto,Foro de Pinheiro Machado,Foro de Piratini,Foro de Porto Xavier,Foro de Sananduva,Foro de Santa Bárbara do Sul,Foro de Santo Antônio das Missões,Foro de Santo Augusto,Foro de Santo Cristo,Foro de São Francisco de Assis,Foro de São José do Norte,Foro de São José do Ouro,Foro de São Marcos,Foro de São Pedro do Sul,Foro de São Sepé,Foro de São Vicente do Sul,Foro de Sapiranga,Foro de Seberi,Foro de Sobradinho,Foro de Tapejara,Foro de Tapera,Foro de Tapes,Foro de Tenente Portela,Foro de Triunfo,Foro de Barra do Ribeiro,Foro de Capão da Canoa,Foro de Igrejinha,Foro de Arroio do Tigre,Foro de Carlos Barbosa,Foro de Dois Irmãos,Foro de Feliz,Foro de Restinga Seca,Foro de Ronda Alta,Foro de Augusto Pestana,Foro de Campina das Missões,Foro de Palmares do Sul,Foro de São Valentim,Foro de Tucunduva,Foro de Agudo,Foro de Portão,Foro de Charqueadas,Foro de Parobé,Foro de Rodeio Bonito,Foro de Teutônia,Foro de Vera Cruz,Foro de Salto do Jacuí,,Foro de Osório(Vara Integrada Terra de Areia),Foro de Três Coroas,Foro de Eldorado do Sul,Foro de Ivoti";
const CSV_Foros_Regionais_TJRS =
  ",Foro Regional do 4º Distrito,Foro Regional do Alto Petrópolis,Foro Regional do Partenon,Foro Regional da Restinga,Foro Regional do Sarandi,Foro Regional da Tristeza";
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
      ...range(1, 6).map((i) =>
        createTribunal(i, `Tribunal Regional Federal da ${i}ª Região`)
      ),
      createTribunal(90, "Conselho de Justiça Federal")
    )
  ),
  createSegmento(
    5,
    "Justiça do Trabalho",
    createPartes(
      createTribunal(0, "Tribunal Superior do Trabalho"),
      ...range(1, 24).map((i) =>
        createTribunal(i, `Tribunal Regional do Trabalho da ${i}ª Região`)
      ),
      createTribunal(90, "Conselho Superior da Justiça do Trabalho")
    )
  ),
  createSegmento(
    6,
    "Justiça Eleitoral",
    createPartes(
      createTribunal(0, "Tribunal Superior Eleitoral"),
      ...range(1, 27).map((i) => {
        const tribunal = createTribunal(
          i,
          `Tribunal Regional Eleitoral de(o)(a) ${estados[i]}`
        );
        tribunal.nomeUnidades = (num) => `${num}ª Zona Eleitoral`;
        return tribunal;
      })
    )
  ),
  createSegmento(
    7,
    "Justiça Militar da União",
    createPartes(
      createTribunal(0, "Superior Tribunal Militar"),
      ...range(1, 12).map((i) =>
        createTribunal(i, `${i}ª Circunscrição Judiciária Militar`)
      )
    )
  ),
  createSegmento(
    8,
    "Justiça dos Estados e do Distrito Federal e Territórios",
    createPartes(
      ...range(1, 27).map((i) =>
        createTribunal(
          i,
          `Tribunal de Justiça do Estado de(o)(a) ${estados[i]}`
        )
      )
    )
  ),
  createSegmento(
    9,
    "Justiça Militar Estadual",
    createPartes(
      ...[13, 21, 26].map((num) =>
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
    unidades: CSV_Subsecoes_PR.split(","),
  },
  {
    prefixo: 71,
    nome: "Seção Judiciária do Rio Grande do Sul",
    unidades: CSV_Subsecoes_RS.split(","),
  },
  {
    prefixo: 72,
    nome: "Seção Judiciária de Santa Catarina",
    unidades: CSV_Subsecoes_SC.split(","),
  },
];
segmentos.get(4)!.tribunais.get(4)!.unidades = createPartes(
  createUnidade(0, "Tribunal Regional Federal da 4ª Região"),
  ...secoesQuarta.flatMap((secao) =>
    unidadesFromNomes(
      secao.unidades,
      (num) => secao.prefixo * 100 + num,
      (nome) => `${secao.nome} - ${nome}`
    )
  ),
  ...range(8000, 8003).map((i) =>
    createUnidade(i, "Processos administrativos (SEI!)")
  ),
  createUnidade(9666, "Secretaria de Precatórios")
);
segmentos.get(8)!.tribunais.get(24)!.unidades = createPartes(
  ...unidadesFromNomes(CSV_Foruns_TJSC.split(","))
);
segmentos.get(8)!.tribunais.get(21)!.unidades = createPartes(
  ...unidadesFromNomes(CSV_Foruns_TJRS.split(",")),
  ...unidadesFromNomes(
    CSV_Foros_Regionais_TJRS.split(","),
    (n) => n * 1000 + 1
  ),
  createUnidade(7000, "Tribunal de Justiça"),
  createUnidade(9000, "Turmas Recursais")
);
export function createUnidade(num: number, nome: string): Unidade {
  return { num, txt: num.toString().padStart(4, "0"), nome };
}
export function createTribunal(
  num: number,
  nome: string,
  unidades?: Map<number, Unidade>
): Tribunal {
  return { num, txt: num.toString().padStart(2, "0"), nome, unidades };
}
export function createSegmento(
  num: number,
  nome: string,
  tribunais: Map<number, Tribunal>
): Segmento {
  return { num, txt: String(num), nome, tribunais };
}
export function createPartes<T extends Parte>(...partes: T[]): Map<number, T> {
  return new Map(partes.map((p) => [p.num, p]));
}
export function unidadesFromNomes(
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

function range(first: number, last: number) {
  if (!Number.isInteger(first) || !Number.isInteger(last))
    throw new Error("Limites do intervalo devem ser inteiros.");
  if (last < first) throw new RangeError("Intervalo deve ser crescente.");
  const length = last + 1 - first;
  return Array.from({ length }, (_, i) => first + i);
}
