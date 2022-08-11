import { KeyMapInterface } from './keymap.interface';
import { environment } from 'src/environments/environment';
declare var tizen;

export const TizenKeyMap: KeyMapInterface = {
  ENTER: 13,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  BACK: 10009,
  DIGIT_0: 48,
  DIGIT_1: 49,
  DIGIT_2: 50,
  DIGIT_3: 51,
  DIGIT_4: 52,
  DIGIT_5: 53,
  DIGIT_6: 54,
  DIGIT_7: 55,
  DIGIT_8: 56,
  DIGIT_9: 57,
  PLAY: 415,
  PAUSE: 19,
  STOP: 413,
  PLAY_PAUSE: 10252,
  FWD: 417,
  RWD: 412
};

const keyName = {
  DIGIT_1: '1',
  DIGIT_2: '2',
  DIGIT_3: '3',
  DIGIT_4: '4',
  DIGIT_5: '5',
  DIGIT_6: '6',
  DIGIT_7: '7',
  DIGIT_8: '8',
  DIGIT_9: '9',
  DIGIT_0: '0',
  PLAY: 'MediaPlay',
  PAUSE: 'MediaPause',
  PLAY_PAUSE: 'MediaPlayPause',
  STOP: 'MediaStop',
  RWD: 'MediaRewind',
  FWD: 'MediaFastForward'
};

function registerDefaultButtons() {
  const names = keyName;
  const keys = [
    names.DIGIT_1,
    names.DIGIT_2,
    names.DIGIT_3,
    names.DIGIT_4,
    names.DIGIT_5,
    names.DIGIT_6,
    names.DIGIT_7,
    names.DIGIT_8,
    names.DIGIT_9,
    names.DIGIT_0,
    names.PLAY,
    names.PAUSE,
    names.PLAY_PAUSE,
    names.STOP,
    names.RWD,
    names.FWD,
  ];
  for (let i = 0; i < keys.length; i += 1) {
    tizen.tvinputdevice.registerKey(keys[i]);
  }
}

if (environment.platform === 'samsung') {
  registerDefaultButtons();
}

