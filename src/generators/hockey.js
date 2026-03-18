import { LISTS } from '../lists.js'
import { toTitleCase } from '../utils.js'

const wordCombinations = [
    '[position] [verbing]',
    '[verbing] [location]',
    '[noun] [verbing] the [position]',
    '[adverb] [verbing]',
    '[noun] [verbing]',
    '[noun] [verbing] [location]',
    '[noun] [verbing] the [noun]',
    '[adverb] [verbing]',
    '[verbing] while [verbing]',
]

const listByWordType = {
    noun: LISTS.hockey.noun,
    verbing: LISTS.hockey.verbing,
    location: LISTS.hockey.location,
    adverb: LISTS.hockey.adverb,
    position: LISTS.hockey.position,
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

export default function generateHockeyPenalty(data) {
    const wordCombination = pick(wordCombinations)
    return toTitleCase(replaceWords(wordCombination, data))
}
