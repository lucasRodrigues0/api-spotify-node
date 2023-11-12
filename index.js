const express = require('express');
const app = express();
const spotifyService = require("./spotifyService");
const fetch = require('node-fetch');

app.get('/playlists/:id', async (req, res) => {
    try {
        const token = await spotifyService.getToken();
        const response = await fetch(`https://api.spotify.com/v1/playlists/${req.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.status === 200) {
            const data = await response.json();
            res.send(data);
        } else {
            throw new Error('Error: ' + response.status);
        }

    } catch(error) {
        res.status(500).send(error.message);
    }
})

/* app.get('/playlists/:id', (req, res) => {
    spotifyService.getToken()
    .then((token) => {
        return fetch(`https://api.spotify.com/v1/playlists/${req.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            } else {
                throw new Error('Erro: código ' + response.status);
            }                
        }).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send(error.message);
        })
    })
}) */

/* app.get('/tracks/:id', (req, res) => {
    spotifyService.getToken()
    .then((token) => {
        return fetch(`https://api.spotify.com/v1/tracks/${req.params.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            } else {
                throw new Error('Erro: código ' + response.status);
            }
        }).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send(error.message);
        })
    })
})

app.get('/playlists/user/:id', (req, res) => {
    spotifyService.getToken()
    .then((token) => {
        return fetch(`https://api.spotify.com/v1/users/${req.params.id}/playlists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            } else {
                throw new Error('Erro: código ' + response.status);
            }
        }).then((data) => {
            res.send(data);
        }).catch(error => {
            res.status(500).send(error.message);
        })
    })
}) */

app.listen(3000, () => {
    console.log('funcionando');
}) 