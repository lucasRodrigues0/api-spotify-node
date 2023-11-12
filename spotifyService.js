const fetch = require('node-fetch');
const credentials = require('./credentials');

const client_id = credentials.client_id;
const client_secret = credentials.client_secret;

let extToken;

async function getToken () {
    if(extToken) {
        return extToken;
    } else {
        try {
            const requestBody = new URLSearchParams();
            requestBody.append('grant_type', 'client_credentials');
        
            const response = await fetch('https://accounts.spotify.com/api/token', { //faz um fetch do endpoint do token
                method: 'POST',
                body: requestBody.toString(),
                headers: {
                    'Authorization': 'Basic ' + new Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            });

            if(response.status === 200) {
                const data = await response.json();
                extToken = data.access_token;
                return extToken;
            }
        } catch (error) {
            throw new Error('error: ', error.message);
        }
                
    }
}

module.exports = {
    getToken
}