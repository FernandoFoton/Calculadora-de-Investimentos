function convertetaxaParaMensalmente(taxaAnual) {
  return taxaAnual ** (1 / 12);
}

export function geraListaDeRetorno(
  capital = 0,
  capitalAdicional = 0,
  prazo = 0,
  tipoPrazo = "mensalmente",
  taxa = 0,
  tipoTaxa = "mensalmente"
) {
  if (!capital || !prazo) {
    throw new Error(
      "Valor inicial investido e prazo devem ser preenchidos com valores positivos."
    );
  }

  const taxaFinal =
    tipoTaxa === "mensalmente"
      ? 1 + taxa / 100
      : convertetaxaParaMensalmente(1 + taxa / 100);

  const prazoFinal = tipoPrazo === "mensalmente" ? prazo : prazo * 12;

  const dadosInvestimento = {
    capital: capital,
    rendimentoAtual: 0,
    totalRendimentos: 0,
    tempoInvestidoMeses: 0,
    saldo: capital,
  };

  const listaDividendos = [dadosInvestimento];

  for (let mesReferencia = 1; mesReferencia <= prazoFinal; mesReferencia++) {
    const totalConta =
      listaDividendos[mesReferencia - 1].saldo * taxaFinal + capitalAdicional;
    const rendimento = totalConta - listaDividendos[mesReferencia - 1].capital;
    const investido =
      rendimento + listaDividendos[mesReferencia - 1].rendimentoAtual;
    const saldo = totalConta;

    listaDividendos.push({
      capital: totalConta,
      rendimentoAtual: rendimento,
      totalRendimentos: investido,
      tempoInvestidoMeses: mesReferencia,
      saldo,
    });
  }

  return listaDividendos;
}
