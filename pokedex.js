const axios = require("axios");
const cheerio = require("cheerio");
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

      pokemons.push({
          number,
          name,
          image
      })
  }); 
  
  return pokemons;
}

exports.getPokedex = getPokedex;