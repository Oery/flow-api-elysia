import { t } from 'elysia';

export const auth_body = {
    body: t.Object({
        authorization_code: t.String({
            error: 'An authorization_code is required',
        }),
    }),
};

export const token_body = {
    body: t.Object({
        expired_token: t.String({
            error: 'An expired token is required',
        }),
    }),
};
