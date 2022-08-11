import { KeyboardItem, KeyboardSettings } from './keyboard.model';

const matrixRuLower: Array<KeyboardItem[]> = [
  [
    { symbol: 'ё' }, { symbol: '1' }, { symbol: '2' }, { symbol: '3' }, { symbol: '4' }, { symbol: '5' },
    { symbol: '6' }, { symbol: '7' }, { symbol: '8' }, { symbol: '9' }, { symbol: '0' }, { symbol: '<-', action: 'backspace', size: 2 },
  ],
  [
    { symbol: 'й' }, { symbol: 'ц' }, { symbol: 'у' }, { symbol: 'к' }, { symbol: 'е' }, { symbol: 'н' },
    { symbol: 'г' }, { symbol: 'ш' }, { symbol: 'щ' }, { symbol: 'з' }, { symbol: 'х' }, { symbol: 'EN', action: 'en', size: 2 }
  ],
  [
    { symbol: 'ф' }, { symbol: 'ы' }, { symbol: 'в' }, { symbol: 'а' }, { symbol: 'п' }, { symbol: 'р' },
    { symbol: 'о' }, { symbol: 'л' }, { symbol: 'д' }, { symbol: 'ж' }, { symbol: 'э' }, { symbol: 'АБВ', action: 'upper', size: 2 }
  ],
  [
    { symbol: 'я' }, { symbol: 'ч' }, { symbol: 'с' }, { symbol: 'м' }, { symbol: 'и' }, { symbol: 'т' },
    { symbol: 'ь' }, { symbol: 'б' }, { symbol: 'ю' }, { symbol: 'ъ' }, { symbol: '@' }, { symbol: '#+=', action: 'specSymbols', size: 2 }
  ],
  [
    { symbol: ' ', size: 13 }
  ]
];

const matrixRuUpper: Array<KeyboardItem[]> = [
  [
    { symbol: 'Ё' }, { symbol: '1' }, { symbol: '2' }, { symbol: '3' }, { symbol: '4' }, { symbol: '5' },
    { symbol: '6' }, { symbol: '7' }, { symbol: '8' }, { symbol: '9' }, { symbol: '0' }, { symbol: '<-', action: 'backspace', size: 2 }
  ],
  [
    { symbol: 'Й' }, { symbol: 'Ц' }, { symbol: 'У' }, { symbol: 'К' }, { symbol: 'Е' }, { symbol: 'Н' },
    { symbol: 'Г' }, { symbol: 'Ш' }, { symbol: 'Щ' }, { symbol: 'З' }, { symbol: 'Х' }, { symbol: 'EN', action: 'en', size: 2 }
  ],
  [
    { symbol: 'Ф' }, { symbol: 'Ы' }, { symbol: 'В' }, { symbol: 'А' }, { symbol: 'П' }, { symbol: 'Р' },
    { symbol: 'О' }, { symbol: 'Л' }, { symbol: 'Д' }, { symbol: 'Ж' }, { symbol: 'Э' }, { symbol: 'абв', action: 'lower', size: 2 }
  ],
  [
    { symbol: 'Я' }, { symbol: 'Ч' }, { symbol: 'С' }, { symbol: 'М' }, { symbol: 'И' }, { symbol: 'Т' },
    { symbol: 'Ь' }, { symbol: 'Б' }, { symbol: 'Ю' }, { symbol: 'Ъ' }, { symbol: '@' }, { symbol: '#+=', action: 'specSymbols', size: 2 }
  ],
  [
    { symbol: ' ', size: 13 }
  ]
];

const matrixEnLower: Array<KeyboardItem[]> = [
  [
    { symbol: '1' }, { symbol: '2' }, { symbol: '3' }, { symbol: '4' }, { symbol: '5' },
    { symbol: '6' }, { symbol: '7' }, { symbol: '8' }, { symbol: '9' }, { symbol: '0' }, { symbol: '<-', action: 'backspace', size: 2 }
  ],
  [
    { symbol: 'q' }, { symbol: 'w' }, { symbol: 'e' }, { symbol: 'r' }, { symbol: 't' }, { symbol: 'y' },
    { symbol: 'u' }, { symbol: 'i' }, { symbol: 'o' }, { symbol: 'p' }, { symbol: 'RU', action: 'ru', size: 2 }
  ],
  [
    { symbol: 'a' }, { symbol: 's' }, { symbol: 'd' }, { symbol: 'f' }, { symbol: 'g' }, { symbol: 'h' },
    { symbol: 'j' }, { symbol: 'k' }, { symbol: 'l' }, { symbol: '@' }, { symbol: 'ABC', action: 'upper', size: 2 }
  ],
  [
    { symbol: 'z' }, { symbol: 'x' }, { symbol: 'c' }, { symbol: 'v' }, { symbol: 'b' }, { symbol: 'n' },
    { symbol: 'm' }, { symbol: '-' }, { symbol: '_' }, { symbol: '.' }, { symbol: '#+=', action: 'specSymbols', size: 2 }
  ],
  [
    { symbol: ' ', size: 13 }
  ]
];

const matrixEnUpper: Array<KeyboardItem[]> = [
  [
    { symbol: '1' }, { symbol: '2' }, { symbol: '3' }, { symbol: '4' }, { symbol: '5' },
    { symbol: '6' }, { symbol: '7' }, { symbol: '8' }, { symbol: '9' }, { symbol: '0' }, { symbol: '<-', action: 'backspace', size: 2 }
  ],
  [
    { symbol: 'Q' }, { symbol: 'W' }, { symbol: 'E' }, { symbol: 'R' }, { symbol: 'T' }, { symbol: 'Y' },
    { symbol: 'U' }, { symbol: 'I' }, { symbol: 'O' }, { symbol: 'P' }, { symbol: 'RU', action: 'ru', size: 2 }
  ],
  [
    { symbol: 'A' }, { symbol: 'S' }, { symbol: 'D' }, { symbol: 'F' }, { symbol: 'G' }, { symbol: 'H' },
    { symbol: 'J' }, { symbol: 'K' }, { symbol: 'L' }, { symbol: '@' }, { symbol: 'abc', action: 'lower', size: 2 }
  ],
  [
    { symbol: 'Z' }, { symbol: 'X' }, { symbol: 'C' }, { symbol: 'V' }, { symbol: 'B' }, { symbol: 'N' },
    { symbol: 'M' }, { symbol: '-' }, { symbol: '_' }, { symbol: '.' }, { symbol: '#+=', action: 'specSymbols', size: 2 }
  ],
  [
    { symbol: ' ', size: 13 }
  ]
];

const matrixSpecSymbols: Array<KeyboardItem[]> = [
  [
    { symbol: '!' }, { symbol: '#' }, { symbol: '$' }, { symbol: '%' }, { symbol: '&' }, { symbol: "'" }, { symbol: '*' }, { symbol: '+' }, { symbol: '<-', action: 'backspace', size: 2 }
  ],
  [
    { symbol: '-' }, { symbol: '/' }, { symbol: '=' }, { symbol: '?' }, { symbol: '^' }, { symbol: '_' }, { symbol: '`' }, { symbol: '{' }, { symbol: 'RU', action: 'ru', size: 2 }
  ],
  [
    { symbol: '|' }, { symbol: '}' }, { symbol: '~' }, { symbol: '"' }, { symbol: '(' }, { symbol: ')' }, { symbol: ',' }, { symbol: '.' }, { symbol: 'abc', action: 'lower', size: 2 }
  ],
  [
    { symbol: ':' }, { symbol: ';' }, { symbol: '<' }, { symbol: '>' }, { symbol: '@' }, { symbol: '[' }, { symbol: '\\' }, { symbol: ']' }, { symbol: '#+=', action: 'specSymbols', size: 2 }
  ],
  [
    { symbol: ' ', size: 13 }
  ]
];

const emails: KeyboardItem[] = [
  { symbol: '@gmail.com', size: 4 },
  { symbol: '@mail.ru', size: 4 },
  { symbol: '@yandex.ru', size: 4 },
  { symbol: '@persik.by', size: 4 }
];


export function getKeyboardLayout(settings: KeyboardSettings) {

  switch (settings.lang) {
    case 'ru':
      if (settings.isUpper) {
        if (settings.needEmail) {
          return addEmails(matrixRuUpper);
        }
        return matrixRuUpper;
      }
      if (settings.needEmail) {
        return addEmails(matrixRuLower);
      }
      return matrixRuLower;

    case 'en':
      if (settings.isUpper) {
        if (settings.needEmail) {
          return addEmails(matrixEnUpper);
        }
        return matrixEnUpper;
      }
      if (settings.needEmail) {
        return addEmails(matrixEnLower);
      }
      return matrixEnLower;

    case 'specSymbols':
      return matrixSpecSymbols;

    default:
      break;
  }

}

function addEmails(layout: Array<KeyboardItem[]>) {
  const keyboardMatrix = JSON.parse(JSON.stringify(layout));
  keyboardMatrix.forEach((row, index) => {
    if (emails[index]) {
      row.push(emails[index]);
    }
  });
  return keyboardMatrix;
}

