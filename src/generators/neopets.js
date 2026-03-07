import { LISTS } from '../lists.js'
import { toTitleCase } from '../utils.js'

const wordCombinations = [
    '[food] [food] [clothing]',
    '[creature] [bodyPart] with [material]',
    '[adjective] [bodyPart] with extra [material]',
    '[adjective] [creature] [item]',
    '[adjective] [creature] [food]',
    '[foodModifier] [food] [clothing]',
    '[creature] [food] [item]',
    '[material] [clothing] of [concept]',
    '[adjective] [material] [item]',
    '[place] [adjective] [item]',
    '[creature] [adjective] [food]',
    '[food] [bodyPart] [item]',
    '[creature] [bodyPart] [clothing]',
    '[foodModifier] [creature] [clothing]',
    '[adjective] [food] of [concept]',
    '[material] [bodyPart] [item]',
    '[creature] [item] of [place]',
    '[food] [food] [food]',
    '[adjective] [bodyPart] [clothing]',
    '[foodModifier] [food] [item]',
    '[creature] [material] [clothing]',
    '[adjective] [creature] [food] [clothing]',
    '[place] [creature] [item]',
    '[food] [clothing] of [concept]',
    '[food] and [food] [bundle]',
    '[food] [food] [bundle]',
    '[food] on [item]',
    '[adjective] [food]',
    '[food] with [adjective] [food]',
    '[food] with [food]',
]

const listByWordType = {
    creature: LISTS.neopets.creature,
    bodyPart: LISTS.neopets.bodyPart,
    food: LISTS.neopets.food,
    foodModifier: LISTS.neopets.foodModifier,
    material: LISTS.neopets.material,
    clothing: LISTS.neopets.clothing,
    item: LISTS.neopets.item,
    adjective: LISTS.neopets.adjective,
    place: LISTS.neopets.place,
    concept: LISTS.neopets.concept,
    bundle: LISTS.neopets.bundle,
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
