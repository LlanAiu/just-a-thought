// builtin

// external

// internal


export interface Success<T> {
    success: true;
    data: T;
}

export interface Failure {
    success: false;
    error: Error;
    code?: number;
}

export type Process<T> = Success<T> | Failure;
export type Task = Process<void>;


export interface SuccessReply<T> {
    success: true;
    data: T;
}

export interface FailureReply {
    success: false;
    error: string;
    message: string;
}

export type BaseReply<T> = SuccessReply<T> | FailureReply;

export interface ReplyConfig<T> {
    reply: BaseReply<T>;
    code: number;
}
