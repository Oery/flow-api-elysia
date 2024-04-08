import TWITCH from './const';
import prisma from '..';

export async function validateToken(token: string) {
    const url = TWITCH.validation.url;
    const headers = { Authorization: `OAuth ${token}` };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw Error(response?.statusText);
        }

        const data = await response.json();
        console.log('Response from Twitch Validation', data);

        await prisma.twitch.create({
            data: {
                login: data.login,
                access_token: data.access_token,
                refresh_token: data.refresh_token,
            },
        });
    } catch (error: any) {
        const errorMessage = error.response
            ? error.response.data.message
            : error.message;
        console.error(errorMessage);
        throw Error(errorMessage);
    }
}
