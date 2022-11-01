export function getRanNum() {
  return Math.ceil(Math.random() * 10) + '';
}

export function getRanChar() {
  return String.fromCharCode(65 + Math.ceil(Math.random() * 25));
}

export function genCard(rule = '@@@###@@##@@###@@@') {
  let card = 'XX_';
  rule.split('').forEach((item) => {
    if (item == '@') {
      card += getRanChar();
    } else if (item == '#') {
      card += getRanNum();
    }
  });
  return card;
}

export function getRanMobile() {
  const prefixArray = ['130', '131', '132', '133', '135', '137', '138', '170', '187', '189'];
  const i = parseInt((10 * Math.random()).toString());
  let prefix = prefixArray[i];
  for (let j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10);
  }

  return parseInt(prefix);
}

export function genNo() {
  return (
    Date.now() +
    Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, '0')
  );
}
