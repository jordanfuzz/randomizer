import { LISTS } from '../lists.js'
import { toTitleCase } from '../utils.js'

const wordCombinations = [
    '[firstName]',
    '[firstName] [lastName]',
    '[lastName]',
    '[adjective] [firstName]',
    '[adjective] [lastName]',
    '[adjective] [noun]',
    '[adjective] [adjective] [noun]',
    '[adjective] [nouns]',
    '[noun]',
    '[noun] [noun]',
    '[noun] [verber]',
    'The [noun] of [noun]',
    'The [verber]',
    'The [verber] of [noun]',
    'The [verber] of [nouns]',
    'The [noun]',
    'The [noun] [verber]',
]

const listByWordType = {
    verb: LISTS.generic.verb,
    verbs: LISTS.generic.verbs,
    verbed: LISTS.generic.verbed,
    verbing: LISTS.generic.verbing,
    noun: LISTS.generic.noun,
    nouns: LISTS.generic.nouns,
    adjective: LISTS.generic.adjective,
    firstName: LISTS.names.firstName,
    lastName: LISTS.names.lastName,
    allNoun: LISTS.generic.allNoun,
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

        if (wordType === 'verber') {
            word = pick(data[LISTS.generic.verb])
            if (word.endsWith('e')) {
                word = word.slice(0, -1)
            }
            word += 'er'
        } else if (wordType === 'noun') {
            const roll = Math.floor(Math.random() * 4)
            if (roll !== 0) {
                word = pick(data[LISTS.generic.noun])
            } else {
                word = pick(data[LISTS.generic.allNoun])
            }
        } else if (listByWordType[wordType]) {
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

export default function generateOsrsCatName(data) {
    const roll = Math.floor(Math.random() * 8)
    if (roll === 0) return pick(data[LISTS.special.catNames])
    else if (roll === 1) return pick(data[LISTS.special.listOWords])
    else {
        const wordCombination = pick(wordCombinations)
        return toTitleCase(replaceWords(wordCombination, data))
    }
}
