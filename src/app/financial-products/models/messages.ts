export type StatusMsg = 'success' | 'error' | 'warning';

export interface Message {
    status: StatusMsg;
    text: string;
    active: boolean;
}