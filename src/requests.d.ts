import { error } from 'elysia';

export interface CodeBody {
    authorization_code: string;
}

export interface CodeRequest {
    path: string;
    body: CodeBody;
    error: error;
}

export interface TokenBody {
    expired_token: string;
}

export interface TokenRequest {
    error: error;
    path: string;
    body: TokenBody;
}
