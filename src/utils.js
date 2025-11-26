export function toTitleCase(str) {
    const smallWords = new Set([
        'a',
        'an',
        'and',
        'as',
        'at',
        'but',
        'by',
        'for',
        'in',
        'nor',
        'of',
        'on',
        'or',
        'per',
        'the',
        'to',
        'vs',
        'via',
        'with',
        'over',
        'into',
        'onto',
        'off',
        'up',
    ])

    const words = str.toLowerCase().split(/\s+/)

    return words
        .map((word, i) => {
            const isFirst = i === 0
            const isLast = i === words.length - 1

            const match = word.match(
                /^([^A-Za-z0-9]*)([A-Za-z0-9][A-Za-z0-9'’-]*)([^A-Za-z0-9]*)$/
            )
            if (!match) return word

            const [, lead, core, trail] = match

            const shouldCap =
                isFirst || isLast || !smallWords.has(core.replace(/[’']/g, ''))

            const casedCore = core
                .split(/([-–—\/])/g)
                .map((seg, idx) => {
                    if (idx % 2 === 1) return seg
                    if (!seg) return seg
                    return shouldCap ? seg[0].toUpperCase() + seg.slice(1) : seg
                })
                .join('')

            return lead + casedCore + trail
        })
        .join(' ')
}
