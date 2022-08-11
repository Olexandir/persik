import { KeyMapInterface } from './keymap.interface';
import { environment } from '../environments/environment.prod';
import { BrowserKeyMap } from './browser.keymap';
import { WebosKeyMap } from './webos.keymap';
import { PanasonicKeyMap } from './panasonic.keymap';
import { PhilipsKeyMap } from './philips.keymap';
import { TizenKeyMap } from './tizen.keymap';

export const KeyMap: KeyMapInterface = getKeyMap();
export const digitsMap = [
    KeyMap.DIGIT_0,
    KeyMap.DIGIT_1,
    KeyMap.DIGIT_2,
    KeyMap.DIGIT_3,
    KeyMap.DIGIT_4,
    KeyMap.DIGIT_5,
    KeyMap.DIGIT_6,
    KeyMap.DIGIT_7,
    KeyMap.DIGIT_8,
    KeyMap.DIGIT_9
  ];

function getKeyMap(): KeyMapInterface {
  switch (environment.platform) {
    case 'lg':
      return WebosKeyMap;
    case 'panasonic':
      return PanasonicKeyMap;
    case 'philips':
      return PhilipsKeyMap;
    case 'samsung':
      return TizenKeyMap;
    default:
      return BrowserKeyMap;
  }
}



