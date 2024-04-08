import prisma from '..';
import { TokenRequest } from '../requests';
import NIGHTBOT from './const';
import { validateToken } from './validate';

export async function refreshNightbot({ body, error }: TokenRequest) {
    const url = NIGHTBOT.refresh.url;
    console.log('Refreshing token');

    let user = await prisma.nightbot.findUnique({
        where: { access_token: body.expired_token },
    });

    if (!user) {
        console.error('User not found');
        throw Error('User not found');
    }

    console.log('User : ', user);

    const params = {
        ...NIGHTBOT.refresh.params,
        refresh_token: user.refresh_token,
    };

    try {
        const formData = new URLSearchParams(params).toString();
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const data = await response.json();
        console.log('Response from Nightbot Refresh', data);
        validateToken(data.access_token).catch((error) => console.error(error));

        await prisma.nightbot.update({
            where: { refresh_token: user.refresh_token },
            data: {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
            },
        });

        return { token: data.access_token };
    } catch (error: any) {
        error(500, error.message);
    }
}
