import { LISTS } from '../lists.js'

export default function generateVideoGameTitle(data) {
    const rawText = data[LISTS.special.videogames]
    const rawLists = rawText.split('----')

    const lists = rawLists.map((section) => {
        return section
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
    })

    function getWord(listIndex) {
        const list = lists[listIndex]
        if (!list) return ''

        const rawItem = list[Math.floor(Math.random() * list.length)]

        return rawItem.split('^')[0].trim()
    }

    let w1 = getWord(0)

    let w2 = getWord(1)
    while (w2 === w1) {
        w2 = getWord(1)
    }

    let w3 = getWord(2)
    while (w3 === w1 || w3 === w2) {
        w3 = getWord(2)
    }

    return `${w1} ${w2} ${w3}`
}
