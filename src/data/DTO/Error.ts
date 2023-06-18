export class ErrorResponse {
    exist: boolean;
    messages: Message[];


    constructor(exist?: boolean, messages?: Message[]) {
        this.exist = exist ?? false;
        this.messages = messages ?? [];
    }
}

export interface Message {
    message: string;
    description: string;
    code: string;
}
