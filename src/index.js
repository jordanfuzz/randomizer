import { LISTS } from './lists.js'
import generateVideoGameTitle from './generators/videogame.js'
import generateOsrsCatName from './generators/cats.js'
import generateMasonicTitle from './generators/masonic.js'
import generateFloridaManHeadline from './generators/florida.js'
import generateWordlabBandName from './generators/wordlab.js'
import generateAnimeTitle from './generators/anime.js'

const GENERATORS = {
    videogame: {
        title: 'Video Game Names',
        subtitle:
            'Continuation of <a href="https://videogamena.me" target="_blank">VGNG</a>',
        files: [LISTS.special.videogames],
        generate: generateVideoGameTitle,
    },
    cats: {
        title: 'OSRS Cat Names',
        files: [
            LISTS.generic.adjective,
            LISTS.generic.noun,
            LISTS.generic.nouns,
            LISTS.generic.allNoun,
            LISTS.names.firstName,
            LISTS.names.lastName,
            LISTS.generic.verb,
            LISTS.generic.verbs,
            LISTS.generic.verbed,
            LISTS.generic.verbing,
            LISTS.special.catNames,
            LISTS.special.listOWords,
        ],
        generate: generateOsrsCatName,
    },
    masonic: {
        title: 'Masonic Titles',
        files: [
            LISTS.masonic.adjective,
            LISTS.masonic.noun,
            LISTS.masonic.of,
            LISTS.masonic.ofthe,
            LISTS.masonic.preadjective,
            LISTS.masonic.prefix,
            LISTS.masonic.suffix,
            LISTS.masonic.title,
            LISTS.names.firstName,
            LISTS.names.lastName,
        ],
        generate: generateMasonicTitle,
    },
    floridaman: {
        title: 'Florida Man Headlines',
        subtitle: '(currently kind of broken)',
        files: [
            LISTS.generic.verb,
            LISTS.generic.verbs,
            LISTS.generic.verbed,
            LISTS.generic.verbing,
            LISTS.generic.noun,
            LISTS.generic.nouns,
            LISTS.generic.adjective,
            LISTS.names.firstName,
            LISTS.names.lastName,
            LISTS.generic.allNoun,
            LISTS.generic.preposition,
            LISTS.florida.are,
            LISTS.florida.verb,
            LISTS.florida.endPhrase,
            LISTS.florida.locationTime,
            LISTS.generic.exclamation,
        ],
        generate: generateFloridaManHeadline,
    },
    wordlab: {
        title: 'Wordlab Band Names',
        subtitle:
            'Continuation of the <a href="https://www.wordlab.com/archives/rock-band-names-list/" target="_blank">Wordlab Band Name Generator</a>',
        files: [LISTS.special.wordlabBands],
        generate: generateWordlabBandName,
    },
    anime: {
        title: 'Anime Title',
        files: [
            LISTS.anime.noun,
            LISTS.anime.nounPhrase,
            LISTS.anime.person,
            LISTS.anime.adjective,
            LISTS.anime.verb,
            LISTS.anime.verbed,
            LISTS.anime.companion,
            LISTS.anime.location,
            LISTS.anime.occasion,
            LISTS.anime.purpose,
            LISTS.anime.qualifier,
            LISTS.anime.personQualifier,
            LISTS.anime.name,
            LISTS.generic.the,
        ],
        generate: generateAnimeTitle,
    },
}

const CACHE = {}

function handleRouting() {
    let path = window.location.pathname.substring(1)

    if (path.endsWith('/')) path = path.slice(0, -1)

    if (path === '' || path === 'index.html') {
        renderMenu()
    } else if (GENERATORS[path]) {
        loadGenerator(path)
    } else {
        render404()
    }
}

window.addEventListener('popstate', handleRouting)
document.addEventListener('DOMContentLoaded', handleRouting)

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const button = document.getElementById('gen-button')

        if (button && !button.disabled) {
            e.preventDefault()
            button.click()
        }
    }
})

function navigateTo(key) {
    history.pushState(null, null, `/${key}`)
    handleRouting()
}

function navigateHome() {
    history.pushState(null, null, '/')
    handleRouting()
}

function renderMenu() {
    const app = document.getElementById('app')
    app.innerHTML = '<h1>Select a Generator</h1><div id="menu-list"></div>'

    const list = document.getElementById('menu-list')
    for (const key of Object.keys(GENERATORS)) {
        const button = document.createElement('button')
        button.innerText = GENERATORS[key].title
        button.onclick = () => navigateTo(key)
        button.style.display = 'block'
        button.style.margin = '20px auto'
        list.appendChild(button)
    }
}

async function loadGenerator(key) {
    const app = document.getElementById('app')
    const generator = GENERATORS[key]
    const subtitleHTML = generator.subtitle
        ? `<p class="subtitle">${generator.subtitle}</p>`
        : ''

    app.innerHTML = `
        <h2>${generator.title}</h2>
        ${subtitleHTML}
        <div id="result">Loading...</div>
        <div class="button-label">Press 'Enter' to generate</div>
        <div class="buttons">
            <button id="back-button">Back</button>
            <button id="gen-button" disabled>Generate</button>
        </div>
    `

    document.getElementById('back-button').onclick = navigateHome

    try {
        await Promise.all(
            generator.files.map(async (file) => {
                if (!CACHE[file]) {
                    const res = await fetch(file)
                    if (!res.ok) throw new Error(`404: ${file}`)
                    if (file.endsWith('.txt')) {
                        CACHE[file] = await res.text()
                    } else {
                        CACHE[file] = await res.json()
                    }
                }
            })
        )

        document.getElementById('result').className = key
        const button = document.getElementById('gen-button')
        button.disabled = false
        button.onclick = () => {
            const res = generator.generate(CACHE)
            document.getElementById('result').innerText = res
        }

        button.click()
    } catch (err) {
        document.getElementById('result').innerText = 'Error loading data.'
        console.error(err)
    }
}

function render404() {
    document.getElementById(
        'app'
    ).innerHTML = `<h1>404</h1><p>Generator not found.</p><button onclick="navigateHome()">Go Home</button>`
}
