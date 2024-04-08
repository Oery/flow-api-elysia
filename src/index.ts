import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';
import { auth_body, token_body } from './validator';
import { authTwitch } from './twitch/auth';
import { authNightbot } from './nightbot/auth';
import { refreshTwitch } from './twitch/refresh';
import { refreshNightbot } from './nightbot/refresh';

const prisma = new PrismaClient();
export default prisma;

const app = new Elysia()
    .post('/auth/twitch/code', authTwitch, auth_body)
    .post('/auth/nightbot/code', authNightbot, auth_body)
    .post('/auth/twitch/refresh', refreshTwitch, token_body)
    .post('/auth/nightbot/refresh', refreshNightbot, token_body)
    .listen(8000);

console.log(
    `Flow API is running at ${app.server?.hostname}:${app.server?.port}`
);
