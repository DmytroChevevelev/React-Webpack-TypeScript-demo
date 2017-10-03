import { AuthHelper } from './AuthHelper';

export const infoStyle = {
    opacity: 1,
    backgroundColor: 'azure',
    marginTop: '10px',
    width: '75%',
    margin: 'auto',
    textAlign: 'left'
};

export const infoTextStyle = {
    color: '#000000'
}

export const waitStyle = {
    opacity: 1,
    backgroundColor: 'yellow',
    marginTop: '10px',
    width: '75%',
    margin: 'auto',
    textAlign: 'left'
};

export const errorStyle = {
    opacity: 1,
    backgroundColor: 'red',
    marginTop: '10px',
    width: '75%',
    margin: 'auto',
    textAlign: 'left'
};

export enum MessageTypes {
    error,
    info,
    wait
}

export interface Message {
    text: string
    type: MessageTypes
}

export interface AppState {
    isBisy: boolean,
    message?: Message,
    messageStyle?: any,
    messageTextStyle?: any
}

export interface InfoBar {
    show(msg?: Message, duration?: number): void
}

export interface CommonProps {
    auth: AuthHelper,
    infoBar: InfoBar,
    isBusy(mode: boolean): void
}