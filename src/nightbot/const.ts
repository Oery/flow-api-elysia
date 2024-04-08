const NIGHTBOT = {
    auth: {
        url: 'https://api.nightbot.tv/oauth2/token',
        params: {
            client_id: 'decbae04d2836ff99a244c5767d7a851',
            client_secret: process.env.NIGHTBOT_CLIENT_SECRET as string,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:8458',
        },
    },
    refresh: {
        url: 'https://api.nightbot.tv/oauth2/token',
        params: {
            client_id: 'decbae04d2836ff99a244c5767d7a851',
            client_secret: process.env.NIGHTBOT_CLIENT_SECRET as string,
            grant_type: 'refresh_token',
            redirect_uri: 'http://localhost:8458',
        },
    },
    validation: {
        url: 'https://api.nightbot.tv/1/channel',
    },
};

export default NIGHTBOT;
