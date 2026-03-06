import { LISTS } from '../lists.js'
import { toTitleCase } from '../utils.js'

const wordCombinations = [
    '[food] [food] [clothing]',
    '[creature] [body-part] with [material]',
    '[adjective] [body-part] with extra [material]',
    '[adjective] [creature] [item]',
    '[food-modifier] [food] [clothing]',
    '[creature] [food] [item]',
    '[material] [clothing] of [concept]',
    '[adjective] [material] [item]',
    '[place] [adjective] [item]',
    '[creature] [adjective] [food]',
    '[food] [body-part] [item]',
    '[creature] [body-part] [clothing]',
    '[food-modifier] [creature] [clothing]',
    '[adjective] [food] of [concept]',
    '[material] [body-part] [item]',
    '[creature] [item] of [place]',
    '[food] [food] [food]',
    '[adjective] [body-part] [clothing]',
    '[food-modifier] [food] [item]',
    '[creature] [material] [clothing]',
    '[adjective] [creature] [food] [clothing]',
    '[place] [creature] [item]',
    '[food] [clothing] of [concept]',
]

const listByWordType = {
    creature: LISTS.neopets.creature,
    'body-part': LISTS.neopets.bodyPart,
    food: LISTS.neopets.food,
    'food-modifier': LISTS.neopets.foodModifier,
    material: LISTS.neopets.material,
    clothing: LISTS.neopets.clothing,
    item: LISTS.neopets.item,
    adjective: LISTS.neopets.adjective,
    place: LISTS.neopets.place,
    concept: LISTS.neopets.concept,
}

function pick(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function replaceWords(wordCombination, data) {
    let loopCount = 0

    while (wordCombination.includes('[') && loopCount < 100) {
        loopCount++

        const start = wordCombination.indexOf('[')
        const end = wordCombination.indexOf(']')
        const wordType = wordCombination.substring(start + 1, end)

        let word = ''
        if (listByWordType[wordType]) {
            const filename = listByWordType[wordType]
            word = pick(data[filename])
        } else {
            console.warn(`Unknown word type: ${wordType}`)
            word = '???'
        }

        wordCombination =
            wordCombination.slice(0, start) +
            word +
            wordCombination.slice(end + 1)
    }
    return wordCombination
}

export default function generateNeopetsItem(data) {
    const wordCombination = pick(wordCombinations)
    return toTitleCase(replaceWords(wordCombination, data))
}
