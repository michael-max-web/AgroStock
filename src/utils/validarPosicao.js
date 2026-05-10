function validarPosicao(posicao) {
  const regex = /^(1|2|3|4)(A|B|C|D)-(0[1-9]|1[0-9]|20)-(0[1-9]|10)$/;

  return regex.test(posicao);
}

export default validarPosicao;