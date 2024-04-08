import prisma from '..';
import { CodeRequest } from '../requests';
import NIGHTBOT from './const';
import { validateToken } from './validate';

export async function authNightbot({ body, error }: CodeRequest) {
    const code = body.authorization_code;
    const url = NIGHTBOT.auth.url;

    const params = { ...NIGHTBOT.auth.params, code };
    const formData = new URLSearchParams(params).toString();

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!response?.ok) {
            return error(
                500,
                `Server error : Nightbot API returned ${response?.statusText}`
            );
        }

        const data = await response.json();
        console.log('Response', data);

        validateToken(data.access_token)
            .then(async () => {
                console.log('Validated token');
                const user = await prisma.nightbot.findUnique({
                    where: { access_token: data.access_token },
                });

                if (!user) {
                    await prisma.nightbot.create({
                        data: {
                            access_token: data.access_token,
                            refresh_token: data.refresh_token,
                        },
                    });
                } else {
                    await prisma.nightbot.update({
                        where: { access_token: data.access_token },
                        data: {
                            refresh_token: data.refresh_token,
                        },
                    });
                }
            })
            .catch((error) => console.error(error));
        return { token: data.access_token };
    } catch (error: any) {
        return error(500, error.message);
    }
}
