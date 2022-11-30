const express = require('express')
const app = express()
const pokedex = require('./pokedex')

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/pokedex', async (req, res) => {
    let pokemons = await pokedex.getPokedex()
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(pokemons, null, 4));
})

app.listen(4000, () => {
    console.log("Listening on port 4000")
})