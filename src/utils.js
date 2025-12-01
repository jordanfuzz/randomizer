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
        // 'over',
        'into',
        'onto',
        'off',
        'up',
        'ed',
        's',
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

export function toPlural(singular) {
    const alreadyPlural = ['sheep', 'fish', 'deer', 'pokemon', 'wood', 'sis']
    if (alreadyPlural.includes(singular.toLowerCase())) {
        return singular
    }
    if (singular.endsWith('y') && !/[aeiou]y$/.test(singular)) {
        return singular.slice(0, -1) + 'ies'
    } else if (
        singular.endsWith('s') ||
        singular.endsWith('x') ||
        singular.endsWith('z') ||
        singular.endsWith('ch') ||
        singular.endsWith('sh')
    ) {
        return singular + 'es'
    } else {
        return singular + 's'
    }
}
