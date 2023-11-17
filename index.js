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
});

app.listen(3000, () => {
    console.log('funcionando');
}) 