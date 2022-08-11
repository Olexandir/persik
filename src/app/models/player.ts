// tslint:disable-next-line: no-namespace
export namespace PlayerEvents {
    export const PLAYER_READY = 'PLAYER_READY';
    export const PLAYER_PLAY = 'PLAYER_PLAY';
    export const PLAYER_PAUSE = 'PLAYER_PAUSE';
    export const PLAYER_ERROR_SUBSCRIPTION = 'PLAYER_ERROR_SUBSCRIPTION';
    export const PLAYER_ERROR_LOGIN = 'PLAYER_ERROR_LOGIN';
    export const PLAYER_ERROR_SERVER = 'PLAYER_ERROR_SERVER';
    export const PLAYER_VALID_PIN = 'PLAYER_VALID_PIN';
    export const PLAYER_ADULT_CONTENT = 'PLAYER_ADULT_CONTENT';
    export const PLAYER_ERROR_MEDIA = 'PLAYER_ERROR_MEDIA';
}

// tslint:disable-next-line: no-namespace
export namespace ControlEvents {
    export const CONTROL_PLAY = 'CONTROL_PLAY';
    export const CONTROL_PAUSE = 'CONTROL_PAUSE';
    export const CONTROL_SEEK = 'CONTROL_SEEK';
    export const CONTROL_VOLUME = 'CONTROL_VOLUME';
}

export class VideoControlEventInfo {
    name: string;
    value: any;

    constructor(name: string, value?: any) {
        this.name = name;
        this.value = value;
    }
}
