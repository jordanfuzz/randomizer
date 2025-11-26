import { LISTS } from '../lists.js'
import { toTitleCase } from '../utils.js'

const wordCombinations = [
    '[title] [firstName]',
    '[title] [lastName]',
    '[title] [firstName] [suffix]',
    '[title] [lastName] [suffix]',
    '[title] of [of]',
    '[title] of the [ofthe]',
    '[title] [noun]',
    '[title] [noun] of [of]',
    '[title] [noun] of the [ofthe]',
    '[adjective] [title]',
    '[adjective] [title] [lastName]',
    '[adjective] [title] of [of]',
    '[adjective] [title] of the [ofthe]',
    '[adjective] [title] [noun]',
    '[adjective] [title] [noun] of [of]',
    '[adjective] [title] [noun] of the [ofthe]',
    '[adjective] [title] [noun] of [of] of the [ofthe]',
    '[adjective] [title] [noun] of the [ofthe] of [of]',
    '[adjective] [title] [noun] of the [ofthe] of the [ofthe]',
    '[preadjective] [adjective] [title]',
    '[preadjective] [adjective] [title] of [of]',
    '[preadjective] [adjective] [title] of the [ofthe]',
    '[preadjective] [adjective] [title] [noun]',
    '[preadjective] [adjective] [title] [noun] of [of]',
    '[preadjective] [adjective] [title] [noun] of the [ofthe] of the [ofthe]',
    '[prefix] [title] [firstName]',
    '[prefix] [title] [lastName]',
    '[prefix] [title] of [of]',
    '[prefix] [title] of the [ofthe]',
    '[prefix] [title] [noun]',
    '[prefix] [title] [noun] of [of]',
    '[prefix] [title] [noun] of the [ofthe]',
    '[adjective] [noun]',
    '[adjective] [adjective] [noun]',
    '[preadjective] [adjective] [noun]',
    '[noun]',
    '[noun] [suffix]',
    'The [noun]',
    '[noun] [noun]',
    'The [noun] of [noun]',
    'The [noun] [suffix]',
    'The [lastName] [suffix]',
]

const listByWordType = {
    adjective: LISTS.masonic.adjective,
    noun: LISTS.masonic.noun,
    of: LISTS.masonic.of,
    ofthe: LISTS.masonic.ofthe,
    preadjective: LISTS.masonic.preadjective,
    prefix: LISTS.masonic.prefix,
    suffix: LISTS.masonic.suffix,
    title: LISTS.masonic.title,
    firstName: LISTS.names.firstName,
    lastName: LISTS.names.lastName,
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

export default function generateMasonicTitle(data) {
    const wordCombination = pick(wordCombinations)
    return toTitleCase(replaceWords(wordCombination, data))
}
