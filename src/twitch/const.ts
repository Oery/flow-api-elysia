const TWITCH = {
    auth: {
        url: 'https://id.twitch.tv/oauth2/token',
        params: {
            client_id: 'cig4pc07b7bxo207x8158v58r1i5pf',
            client_secret: process.env.TWITCH_CLIENT_SECRET as string,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:8457',
        },
    },
    refresh: {
        url: 'https://id.twitch.tv/oauth2/token',
        params: {
            client_id: 'cig4pc07b7bxo207x8158v58r1i5pf',
            client_secret: process.env.TWITCH_CLIENT_SECRET as string,
            grant_type: 'refresh_token',
            redirect_uri: 'http://localhost:8457',
        },
    },
    validation: {
        url: 'https://id.twitch.tv/oauth2/validate',
        params: {
            client_id: 'cig4pc07b7bxo207x8158v58r1i5pf',
            grant_type: 'refresh_token',
            client_secret: process.env.TWITCH_CLIENT_SECRET as string,
        },
    },
};

export default TWITCH;
