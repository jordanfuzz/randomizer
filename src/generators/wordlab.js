import { LISTS } from '../lists.js'

function pick(list) {
    return list[Math.floor(Math.random() * list.length)]
}

export default function generateWordlabBandName(data) {
    return pick(data[LISTS.special.wordlabBands])
}
