var Pokemon = require('./pokemon.js');
const cheerio = require("cheerio");
const fetch = require('node-fetch');

const url = "https://pokemondb.net/pokedex/game/scarlet-violet";

async function getPokedex() {

  const response = await fetch(url);
  const body = await response.text();
  const pokemons = [];
  const $ = cheerio.load(body);
    
  $('.infocard-list-pkmn-lg > .infocard').map((i, el) => {
      const name = $(el).find('.infocard-lg-data > .ent-name').text();
      const number = $(el).find('.infocard-lg-data > small').first().text();
      const image = $(el).find('.infocard-lg-img > a > .img-sprite').attr('src');
      
      const types = [];
      $(el).find('.infocard-lg-data > small > .itype').each((i, link) => {
        const type = $(link).attr('class').replace('itype ', '');
        types.push(type);
      });

      pokemons.push(
        new Pokemon(
          number, name, image, types
        )
      )
  }); 
  
  return pokemons;
}

exports.getPokedex = getPokedex;