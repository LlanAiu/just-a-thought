// builtin

// external

// internal


export interface BaseReply<T> {
    data?: T,
}

export interface ProcessSuccess<T> {
    success: true;
    data: T;
}

export interface TaskSuccess {
    success: true;
}

export interface Failure {
    success: false;
    error: Error;
}

export type Process<T> = ProcessSuccess<T> | Failure;
export type Task = TaskSuccess | Failure;