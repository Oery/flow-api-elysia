// import { CodeBody, TokenBody } from './requests';
// import prisma from '.';

// export enum Service {
//     twitch = 'twitch',
//     nightbot = 'nightbot',
// }

// interface ServiceUrls {
//     url: string;
//     validationUrl: string;
//     params: Record<string, string>;
// }

// function getPrismaModel(service: Service): (typeof prisma)[Service] {
//     switch (service) {
//         case Service.twitch:
//             return prisma.twitch;
//         case Service.nightbot:
//             return prisma.nightbot;
//     }
// }

// const SERVICES = {
//     twitch: {
//         url: 'https://id.twitch.tv/oauth2/token',
//         validationUrl: 'https://id.twitch.tv/oauth2/validate',
//         params: {
//             client_id: 'cig4pc07b7bxo207x8158v58r1i5pf',
//             client_secret: process.env.TWITCH_CLIENT_SECRET as string,
//             grant_type: 'authorization_code',
//             redirect_uri: 'http://localhost:8457',
//         },
//     },
//     nightbot: {
//         url: 'https://api.nightbot.tv/oauth2/token',
//         validationUrl: 'https://api.nightbot.tv/1/channel',
//         params: {
//             client_id: 'decbae04d2836ff99a244c5767d7a851',
//             client_secret: process.env.NIGHTBOT_CLIENT_SECRET as string,
//             grant_type: 'authorization_code',
//             redirect_uri: 'http://localhost:8458',
//         },
//     },
// } satisfies Record<Service, ServiceUrls>;

// export function getService(path: string): Service {
//     if (path.startsWith('/auth/twitch')) return 'twitch' as Service;
//     else if (path.startsWith('/auth/nightbot')) return 'nightbot' as Service;
//     throw Error('Unknown path');
// }

// export async function tradeCodeForToken(body: CodeBody, service: Service) {
//     const code = body.authorization_code;
//     const url = SERVICES[service].url;
//     let params = { ...SERVICES[service].params, code };

//     console.log('Trading code for token for service', service);

//     try {
//         let response;

//         if (service === 'twitch') {
//             response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(params),
//             });
//         } else if (service === 'nightbot') {
//             const formData = new URLSearchParams(params).toString();
//             response = await fetch(url, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });
//         }

//         if (!response?.ok) {
//             throw Error(response?.statusText);
//         }

//         const data = await response.json();
//         console.log('Response', data);

//         validateToken(data.access_token, service);
//         return { token: data.access_token };
//     } catch (error: any) {
//         console.error(error);
//         console.error(error.code);

//         if (error.response?.status === 400) {
//             throw Error(`Server error : ${error.code}`);
//         }

//         const errorMessage = error.response
//             ? error.response.data.message
//             : error.message;
//         throw Error(errorMessage);
//     }
// }

// export async function refreshToken(body: TokenBody, service: Service) {
//     const expiredToken = body.expired_token;
//     const prismaModel = getPrismaModel(service);

//     let user = await prismaModel.findUnique({
//         where: { access_token: expiredToken },
//     });

//     if (!user) {
//         console.error('Refresh Token not found');
//         throw Error('Refresh Token not found');
//     }

//     const params: Record<any, any> = {
//         client_id: SERVICES[service].params.client_id,
//         client_secret: SERVICES[service].params.client_secret,
//         grant_type: 'refresh_token',
//         refresh_token: user.refresh_token,
//     };

//     if (service === 'nightbot') {
//         params.redirect_uri = 'http://localhost:8000';
//     }

//     // try {
//     //     const response = await axios.post(url, params);
//     //     validateToken(response.data.access_token, service);

//     //     await prismaModel.update({
//     //         where: { refresh_token: user.refresh_token },
//     //         data: { access_token: response.data.access_token },
//     //     });

//     //     return { token: response.data.access_token };
//     // } catch (error: any) {
//     //     const errorMessage = error.response
//     //         ? error.response.data.message
//     //         : error.message;
//     //     console.error(errorMessage);
//     //     throw Error(errorMessage);
//     // }
// }

// async function validateToken(token: string, service: Service) {
//     const url = SERVICES[service].validationUrl;
//     const headers = {
//         Authorization: `Bearer ${token}`,
//     };

//     try {
//         const response = await fetch(url, { headers });

//         if (!response?.ok) {
//             throw Error(response?.statusText);
//         }

//         const data = await response.json();
//         console.log('Response', data);

//         if (service === 'twitch') {
//             await prisma.twitch.create({
//                 data: {
//                     login: data.login,
//                     access_token: data.access_token,
//                     refresh_token: data.refresh_token,
//                 },
//             });
//         } else if (service === 'nightbot') {
//             await prisma.nightbot.create({
//                 data: {
//                     access_token: data.access_token,
//                     refresh_token: data.refresh_token,
//                 },
//             });
//         }
//     } catch (error: any) {
//         const errorMessage = error.response
//             ? error.response.data.message
//             : error.message;
//         console.error(errorMessage);
//         throw Error(errorMessage);
//     }
// }
