module.exports = class Pokemon {
    constructor(number, name, image, types) {
      this.number = number;
      this.name = name;
      this.image = image
      this.types = types
    }
}

module.exports = class PokemonStats {
  constructor(hp, minhp, maxhp, atk, minatk, maxatk,
             def, mindef, maxdef, spatk, minspatk, maxspatk, 
             spdef, minspdef, maxspdef) {
    this.hp = hp;
    this.minhp = minhp;
    this.maxhp = maxhp;
    this.atk = atk;
    this.minatk = minatk;
    this.maxatk = maxatk;
    this.def = def;
    this.mindef = mindef;
    this.maxdef = maxdef;
    this.spatk = spatk;
    this.minspatk = minspatk;
    this.maxspatk = maxspatk;
    this.spdef = spdef;
    this.minspdef = minspdef;
    this.maxspdef = maxspdef;
  }
}

module.exports = class Movement {
  constructor(tm, name, type, cat, power, accuracy) {
    this.tm = tm;
    this.name = name;
    this.type = type;
    this.cat = cat;
    this.power = power;
  }
}