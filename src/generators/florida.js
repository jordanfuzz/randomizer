import { LISTS } from '../lists.js'
import { toTitleCase } from '../utils.js'

const wordCombinations = [
    'Florida man [verbs] [noun] to [verb] [noun]',
    'Florida man [verbs] [nouns] to [verb] [noun]',
    'Florida man [verbs] [nouns] to [verb] [nouns]',
    'Florida man [verbs] [noun] to [verb] [nouns]',
    'Florida man [verbs] to his [noun]',
    'Florida man [verbs] to his [nouns]',
    'Florida man [verbed] to his [noun]',
    'Florida man [verbed] to his [nouns]',
    'Florida man [verbs] his [noun]',
    'Florida man [verbs] his [nouns]',
    'Florida man [verbed] his [noun]',
    'Florida man [verbed] his [nouns]',
    'Florida man [verbs] while [verbing] [noun]',
    'Florida man [verbs] while [verbing]',
    'Florida man [verbs] while [verbing] [nouns]',
    'Florida man [verbs] his [noun] while [verbing] [nouns]',
    'Florida man [verbed] while [verbing] [noun]',
    'Florida man [verbs]',
    'Florida man [verbed]',
    'Florida man [verbed] [preposition] [noun]',
    'Florida man [verbed] [preposition] [nouns]',
    'Florida man [verbs] [preposition] [noun]',
    'Florida man [verbs] [preposition] [nouns]',
    'Florida man [verbs] [preposition] [firstName]',
    'Florida man [verbed] [preposition] [firstName]',
    'Florida man [verbs] [preposition] [firstName] [lastName]',
    'Florida man [verbed] [preposition] [firstName] [lastName]',
    "Florida man's [noun] is [adjective]",
    "Florida man's [nouns] are [adjective]",
    'Florida man is [adjective]',
    'Florida man has [noun]',
    'Florida man has [nouns]',
    'Florida man has been [adjective] for days',
    '[adjective] [noun] [verbed] by Florida man',
    'Florida man [verbed] for [verbing] [noun]',
    'Florida man [verbed] for [verbing] [nouns]',
    'Florida man [adjective] because of [noun]',
    'Florida man [adjective] because of [nouns]',
    'Florida man and his [noun] [verbed]',
    'Florida man [verbs] [noun]',
    'Florida man [verbs] [nouns]',
    'Florida man [verbed] [noun]',
    'Florida man [verbed] [nouns]',
    'Florida man [verbs] [noun], [verbs]',
    'Florida man [verbs] [noun] to [specialVerb] [nouns] [are] [adjective], [verbs]',
    'Florida man cannot stop [verbing]',
    'Florida man cannot stop [verbing] [noun]',
    'Florida man cannot stop [verbing] [nouns]',
    'Florida man cannot stop [noun]',
    'Florida man wants [noun] from [firstName]',
    'Florida man afraid of the [noun] [noun]',
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
    preposition: LISTS.generic.preposition,
    are: LISTS.florida.are,
    specialVerb: LISTS.florida.verb,
    endPhrase: LISTS.florida.endPhrase,
    locationTime: LISTS.florida.locationTime,
    exclamation: LISTS.generic.exclamation,
}

function pick(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function addOptionalBeginnings(sentence) {
    return pick([`[exclamation] ${sentence}`, `At [locationTime], ${sentence}`])
}

function addOptionalEndings(sentence) {
    return pick([
        `${sentence} [preposition] [locationTime]`,
        `${sentence}, [endPhrase]`,
    ])
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

export default function generateFloridaManHeadline(data) {
    let wordCombination = pick(wordCombinations)
    const roll = Math.floor(Math.random() * 10)
    if (roll === 0) wordCombination = addOptionalBeginnings(wordCombination)
    else if (roll === 1) wordCombination = addOptionalEndings(wordCombination)
    else if (roll === 2) {
        wordCombination = addOptionalEndings(
            addOptionalBeginnings(wordCombination)
        )
    }
    return toTitleCase(replaceWords(wordCombination, data))
}
