const express = require('express')
const app = express()
const pokedex = require('./pokedex')
const detail = require('./detail')
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/pokedex', async (req, res) => {
  let pokemons = await pokedex.getPokedex()
  res.header("Content-Type",'application/json')
  res.send(JSON.stringify(pokemons, null, 4))
})

app.get('/pokedex/:pokemon', async (req, res) => {
  let name = req.params.pokemon
  let pkmDetail = await detail.getDetail(name)
  res.header("Content-Type",'application/json')
  res.send(JSON.stringify(pkmDetail, null, 4))
});

app.listen(port, () => {
    console.log("Listening on port 4000")
})