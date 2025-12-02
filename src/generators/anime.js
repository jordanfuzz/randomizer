import { LISTS } from '../lists.js'
import { toTitleCase, toPlural } from '../utils.js'

const wordCombinations = [
    'my [person] met my [person]',
    'I [verb] everything',
    'I [verb] a [noun]',
    'I got this new [noun]',
    'I found a [noun]',
    'my [nouns] are [adjective]',
    'my [person] discovered my secret [noun]',
    'I must [verb] [the] [noun]',
    'I gotta [verb] my [person]',
    'My [person] has [adjective] [nouns]',
    'I [verbed] the [adjective] [noun]',
    'I think I [verbed] the [noun]',
    'I [verbed] my [person]',
    'Maybe I should [verb] your [person]',
    'The [noun] of my [person]',
    '[the] [noun] and [the] [noun]',
    'My [person] makes the best [nouns]',
    'I [verbed] all of my [persons]',
    "My [nouns] aren't working",
]

const prefixes = [
    'my [person] says ',
    'according to my [person], ',
    '[adjective] [noun]: ',
    'oops, ',
    'in a previous life: ',
    'dear [person], ',
]

const suffixes = [
    ', or so I thought',
    ', or maybe I [verbed] it',
    ', if you believe in that sort of thing',
    ' [location]',
    ' [purpose]',
    ' [location] [purpose]',
    ' [qualifier]',
    ' [occasion]',
    ' [companion]',
    ' [occasion] [companion]',
    // Repeated to increase likelihood
    ' [location]',
    ' [purpose]',
    ' [location] [purpose]',
    ' [qualifier]',
    ' [occasion]',
    ' [companion]',
    ' [occasion] [companion]',
]

const listByWordType = {
    noun: LISTS.anime.noun,
    nounPhrase: LISTS.anime.nounPhrase,
    person: LISTS.anime.person,
    adjective: LISTS.anime.adjective,
    verb: LISTS.anime.verb,
    verbed: LISTS.anime.verbed,
    companion: LISTS.anime.companion,
    location: LISTS.anime.location,
    occasion: LISTS.anime.occasion,
    purpose: LISTS.anime.purpose,
    qualifier: LISTS.anime.qualifier,
    personQualifier: LISTS.anime.personQualifier,
    name: LISTS.anime.name,
    the: LISTS.generic.the,
}

function pick(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function addOptionalPrefixes(sentence) {
    return pick(prefixes) + sentence
}

function addOptionalSuffixes(sentence) {
    if (sentence.endsWith('[person]')) {
        return sentence + pick([...suffixes, ' [personQualifier]'])
    }
    return sentence + pick(suffixes)
}

function replaceWords(wordCombination, data) {
    let loopCount = 0

    while (wordCombination.includes('[') && loopCount < 100) {
        loopCount++

        const start = wordCombination.indexOf('[')
        const end = wordCombination.indexOf(']')
        const wordType = wordCombination.substring(start + 1, end)

        let word = ''
        if (wordType === 'noun') {
            const roll = Math.floor(Math.random() * 7)
            if (roll !== 0) {
                word = pick(data[LISTS.anime.noun])
            } else {
                word = pick(data[LISTS.anime.nounPhrase])
            }
        } else if (wordType === 'nouns') {
            const roll = Math.floor(Math.random() * 2)
            if (roll !== 0) {
                word = toPlural(pick(data[LISTS.anime.noun]))
            } else {
                word = toPlural(pick(data[LISTS.anime.nounPhrase]))
            }
        } else if (wordType === 'persons') {
            word = toPlural(pick(data[LISTS.anime.person]))
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

export default function generateAnimeTitle(data) {
    let wordCombination = pick(wordCombinations)
    const roll = Math.floor(Math.random() * 8)
    if (roll === 0) wordCombination = addOptionalPrefixes(wordCombination)
    else if (roll <= 2) wordCombination = addOptionalSuffixes(wordCombination)
    else if (roll === 3) {
        wordCombination = addOptionalSuffixes(
            addOptionalPrefixes(wordCombination)
        )
    }
    return toTitleCase(replaceWords(wordCombination, data))
}
