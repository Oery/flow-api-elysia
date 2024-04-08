import prisma from '..';
import { TokenBody } from '../requests';
import TWITCH from './const';
import axios from 'axios';
import { validateToken } from './validate';

export async function refreshTwitch(body: TokenBody) {
    const expiredToken = body.expired_token;

    let user = await prisma.twitch.findUnique({
        where: { access_token: expiredToken },
    });

    if (!user) {
        console.error('User not found');
        throw Error('User not found');
    }

    const params = {
        ...TWITCH.validation.params,
        refresh_token: user.refresh_token,
    };

    try {
        const response = await axios.post(TWITCH.refresh.url, params);
        validateToken(response.data.access_token);

        await prisma.twitch.update({
            where: { refresh_token: user.refresh_token },
            data: { access_token: response.data.access_token },
        });

        return { token: response.data.access_token };
    } catch (error: any) {
        const errorMessage = `Server error : ${error.status} ${error.message} ${error.error}`;
        throw Error(errorMessage);
    }
}
