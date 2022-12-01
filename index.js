const express = require('express')
const app = express()
const pokedex = require('./pokedex')
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/pokedex', async (req, res) => {
    let pokemons = await pokedex.getPokedex()
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(pokemons, null, 4));
})

app.listen(port, () => {
    console.log("Listening on port 4000")
})