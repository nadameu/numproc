import { sanitize } from "./logic";

export function update(output: HTMLOutputElement, input: string) {
  output.textContent = "";
  if (input === "") return;
  const sanitizedEither = sanitize(input);
  if (sanitizedEither.isLeft) {
    output.innerHTML = `<span class="erro">${sanitizedEither.leftValue}</span>`;
    return;
  }
  const numproc = sanitizedEither.rightValue;

  const map = new Map();
  map.set("Número do processo", numproc.formatado);
  map.set("Número sequencial", numproc.sequencial.txt);
  map.set("Dígito verificador", numproc.digitoVerificador.txt);
  if (numproc.ano.isLeft) {
    map.set("Ano", `<span class="erro">${numproc.ano.leftValue}</span>`);
  } else {
    map.set("Ano", numproc.ano.rightValue.txt);
  }
  if (numproc.segmento.isLeft) {
    map.set(
      "Segmento do Poder Judiciário",
      `<span class="erro">${numproc.segmento.leftValue}</span>`
    );
  } else {
    map.set("Segmento do Poder Judiciário", numproc.segmento.rightValue.nome);
  }
  if (numproc.tribunal) {
    if (numproc.tribunal.isLeft) {
      map.set(
        "Tribunal",
        `<span class="erro">${numproc.tribunal.leftValue}</span>`
      );
    } else {
      map.set("Tribunal", numproc.tribunal.rightValue.nome);
    }
  }
  if (numproc.unidade) {
    if (numproc.unidade.isLeft) {
      map.set(
        "Unidade de origem",
        `<span class="erro">${numproc.unidade.leftValue}</span>`
      );
    } else {
      map.set("Unidade de origem", numproc.unidade.rightValue.nome);
    }
  }
  /*
  nomePartes.forEach((key, index) => {
    const text = partes[index];
    const num = Number(text);

    if (index === 1) {
      // Dígito verificador
      const ver = validarDV(numproc);
      if (ver.isLeft) {
        const msg = `Dígito verificador incorreto: "${text}". Valor esperado: "${ver.leftValue.slice(
          7,
          9
        )}".`;
        map.set(key, `<span class="erro">${msg}</span>`);
        erros.push(msg);
      } else {
        map.set(key, text);
      }
    } else if (index === 3) {
      // Segmento do Poder Judiciário
      const segmento = segmentos.get(num);
      if (!segmento) {
        const msg = `Segmento inválido: "${text}". Valores aceitos: ${formatarRanges(
          [...segmentos.keys()],
          (x) => `"${x}"`
        )}.`;
        map.set(key, `<span class="erro">${msg}</span>`);
        erros.push(msg);
      } else {
        map.set(key, `${text} &ndash; ${segmento.nome}`);
      }
    } else if (index === 4) {
      // Tribunal
      const segmento = segmentos.get(Number(partes[3]));
      if (!segmento) return;
      const tribunal = segmento.tribunais.get(num);
      if (!tribunal) {
        const msg = `Tribunal inválido: "${text}". Valores aceitos: ${formatarRanges(
          [...segmento.tribunais.keys()]
        )}.`;
        map.set(key, `<span class="erro">${msg}</span>`);
        erros.push(msg);
      } else {
        map.set(key, `${text} &ndash; ${tribunal.nome}`);
      }
    } else if (index === 5) {
      // Unidade de origem
      const numSegmento = Number(partes[3]);
      const segmento = segmentos.get(numSegmento);
      if (!segmento) return;
      const numTribunal = Number(partes[4]);
      const tribunal = segmento.tribunais.get(numTribunal);
      if (!tribunal) return;
      if (num === 0) {
        map.set(key, tribunal.nome);
      } else if (num === 9666 && numSegmento === 4 && numTribunal === 4) {
        map.set(key, "Secretaria de Precatórios");
      } else if (num > 8999) {
        map.set(key, "Turma recursal");
      } else if (numSegmento === 4 && numTribunal === 4) {
        // TRF4
        const numSecao = Number(text.slice(0, 2));
        const secao = unidadesQuarta.get(numSecao);
        if (!secao) {
          const msg = `Unidade inválida: "${text}". Valores aceitos: ${formatarRanges(
            [...unidadesQuarta.keys()],
            (x) => `"${x}XX"`
          )}`;
          map.set(key, `<span class="erro">${msg}</span>`);
          erros.push(msg);
          return;
        }
        const numUnidade = Number(text.slice(2));
        const unidade = secao.unidades.get(numUnidade);
        if (!unidade) {
          const msg = `Unidade inválida: "${text}". Valores aceitos: ${formatarRanges(
            [...secao.unidades.keys()],
            (x) => `"${numSecao}${x.toString().padStart(2, "0")}"`
          )}`;
          map.set(key, `<span class="erro">${msg}</span>`);
          erros.push(msg);
          return;
        }
        map.set(key, `${secao.nome} &ndash; ${unidade}`);
      } else if (numSegmento === 8 && numTribunal === 24) {
        // TJSC
        const unidade = unidadesTJSC[num];
        if (!unidade) {
          const msg = `Unidade inválida: "${text}". Valores aceitos: ${formatarRanges(
            [
              ...unidadesTJSC
                .map((x, i) => (x === "" ? null : i))
                .filter((x): x is number => x !== null),
            ],
            (x) => `"${x.toString().padStart(4, "0")}"`
          )}`;
          map.set(key, `<span class="erro">${msg}</span>`);
          erros.push(msg);
          return;
        }
        map.set(key, unidade);
      } else if (numSegmento === 6) {
        // Justiça Eleitoral
        map.set(key, `${num}ª Zona Eleitoral`);
      } else {
        map.set(key, text);
      }
    } else {
      map.set(key, text);
    }
  });
  if (sistema) {
    map.set("Sistema", sistema);
  }*/
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
