// builtin

// external

// internal


export interface BaseReply<T> {
    data?: T,
}

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