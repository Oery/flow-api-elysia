import { CodeRequest } from '../requests';
import TWITCH from './const';
import { validateToken } from './validate';
import axios from 'axios';

export async function authTwitch({ body, error }: CodeRequest) {
    const code = body.authorization_code;
    const url = TWITCH.auth.url;
    let params = { ...TWITCH.auth.params, code };

    console.log('Trading code for token for Twitch');

    try {
        const response = await axios.post(url, params);
        validateToken(response.data.access_token);
        return { token: response.data.access_token };
    } catch (error: any) {
        return error(500, error.message);
    }
}
