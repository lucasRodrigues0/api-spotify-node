const fetch = require('node-fetch');
const credentials = require('./credentials');

const client_id = credentials.client_id;
const client_secret = credentials.client_secret;

let extToken;

getToken = () => {
    if(extToken) {
        return Promise.resolve(extToken); //retorna o token caso já exista
    } 
    else {
        return new Promise((resolve, reject) => {

            const requestBody = new URLSearchParams();
            requestBody.append('grant_type', 'client_credentials');

            return fetch('https://accounts.spotify.com/api/token', { //faz um fetch do endpoint do token
                method: 'POST',
                body: requestBody.toString(),
                headers: {
                    'Authorization': 'Basic ' + new Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if(response.status === 200) {
                    return response.json(); //retorna um json com a resposta
                } else {
                    throw new Error('Erro: código ' + response.status);
                }                
            })
            .then(data => {
                if(data.access_token) {
                    extToken = data.access_token; //atribui o token gerado para a variável extToken
                    resolve(extToken);
                } else {
                    throw new Error('Erro ao obter o token');
                    reject(extToken);
                }
            });
        });
    }
};

module.exports = {
    getToken
}