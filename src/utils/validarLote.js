function validarLote(lote) {
  lote = lote.trim().toUpperCase();

  // Regex: MIL2025001
  const regex = /^(MIL|SOJ|SOR)\d{4}\d{3}$/;

  if (!regex.test(lote)) {
    return false;
  }

  // Extrair ano (posição 3 até 7)
  const ano = parseInt(lote.substring(3, 7));
  const anoAtual = new Date().getFullYear();

  // Validação do ano
  if (ano < 2000 || ano > anoAtual + 1) {
    return false;
  }

  return true;
}

export default validarLote;