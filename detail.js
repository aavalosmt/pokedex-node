const cheerio = require("cheerio");
const fetch = require('node-fetch')

async function getDetail(name) {
    const url = "https://pokemondb.net/pokedex/" + name;
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    var data = {}  

    const attributes = $('#tab-basic-25 > div > div > .vitals-table > tbody > tr')
    const levelMovements = $('#tab-moves-21 > div > div:nth-child(1) > div:nth-child(3) > .data-table > tbody > tr')
    const eggMovements = $('#tab-moves-21 > div > div:nth-child(1) > div:nth-child(6) > .data-table > tbody > tr')
    const tmMovements = $('#tab-moves-21 > div > div:nth-child(2) > div > .data-table > tbody > tr')

    data["attributes"] = parseAttributes($, attributes)
    data["level-movements"] = parseMovements($, levelMovements)
    data["egg-movements"] = parseMovements($, eggMovements)
    data["tm-movements"] = parseMovements($, tmMovements)

    return data
}

function parseAttributes($, attributes) {
    var data = {}

    attributes.each((i, el) => {
        const key = $(el).find('th').text();
        const td = $(el).find('td');

        const values = []
        if(i < (attributes.length - 1)) {
            var iterate = function (parent, result = []) {
                let children = $(parent).children();

                if(children.length > 1) {
                    children.each((i, elem) => iterate(elem, result)) 
                } else {
                    const text = $(parent).text().replace(/\n/g, '')
                    if(text != '') {
                        result.push(text)
                    }
                }
                return result
            }
            iterate(td, values)

            if(values.length > 1) {
                data[key] = values
            } else if(values.length == 1) {
                const value = values.at(0)
                data[key] = value
            }
            return true
        }

        const brs = $(td).html().split("<br>");
        brs.forEach((element, i) => {
            if(String(element) != '') {
                const number = String(element).substring(0, 3)
                var regex = /(?<=\>)(.*?)(?=\<)/
                const results = regex.exec(String(element))
                if(results.length > 0) {
                    const content = number + ' ' + results[1]
                    values.push(content)
                }
            }
        })
        data[key] = values
    })

    return data
}

function parseMovements($, movements) {
    var data = []
    movements.each((i, el) => {
        const numValues = $(el).find('.cell-num')
        const level = $(numValues.get(0)).text()
        const name = $(el).find('.ent-name').text()
        const type = $(el).find('.type-icon').text()
        const category = $(el).find('.cell-icon > .img-fixed').attr('title')
        const power = $(numValues.get(1)).text()
        const acc = $(numValues.get(2)).text()

        console.dir($(el).children())
        data.push({
            level: level,
            name: name,
            type: type,
            category: category,
            power: power,
            acc: acc
        }) 
    })
    return data
}

exports.getDetail = getDetail;
