import NIGHTBOT from './const';

export async function validateToken(token: string) {
    const url = NIGHTBOT.validation.url;
    const headers = { Authorization: `Bearer ${token}` };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw Error(response?.statusText);
        const data = await response.json();
        console.log('Response from Nightbot Validation', data);
    } catch (error: any) {
        const errorMessage = error.response
            ? error.response.data.message
            : error.message;
        console.error(errorMessage);
        // throw Error(errorMessage);
    }
}
