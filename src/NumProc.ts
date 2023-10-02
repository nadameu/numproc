import { Either } from "./Either";

export interface Parte {
  num: number;
  txt: string;
}
export interface Sequencial extends Parte {}
export interface DigitoVerificador extends Parte {}
export interface Ano extends Parte {}
export interface Segmento extends Parte {
  nome: string;
  tribunais: Map<number, Tribunal>;
}
export interface Tribunal extends Parte {
  nome: string;
  unidades?: Map<number, Unidade>;
  nomeUnidades?: (num: number) => string;
}
export interface Unidade extends Parte {
  nome?: string;
}
export interface NumProc {
  txt: string;
  formatado: string;
  sequencial: Sequencial;
  digitoVerificador: Either<string, DigitoVerificador>;
  ano: Either<string, Ano>;
  segmento: Either<string, Segmento>;
  tribunal: Either<string, Tribunal> | null;
  unidade: Either<string, Unidade> | null;
}
