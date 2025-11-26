import { LISTS } from './lists.js'
import generateVideoGameTitle from './generators/videogame.js'
import generateOsrsCatName from './generators/cats.js'

const GENERATORS = {
    videogame: {
        title: 'Video Game Name Generator',
        files: [LISTS.special.videogames],
        generate: generateVideoGameTitle,
    },
    cats: {
        title: 'OSRS Cat Name Generator',
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
        title: 'Masonic Name Generator',
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
        generate: (data) => {},
    },
    floridaman: {
        title: 'Florida Man Headline Generator',
        files: [],
        generate: (data) => {},
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
        const btn = document.createElement('button')
        btn.innerText = GENERATORS[key].title
        btn.onclick = () => navigateTo(key)
        btn.style.display = 'block'
        btn.style.margin = '10px 0'
        list.appendChild(btn)
    }
}

async function loadGenerator(key) {
    const app = document.getElementById('app')
    const generator = GENERATORS[key]

    app.innerHTML = `<h2>${generator.title}</h2><div id="result">Loading...</div><button id="gen-btn" disabled>Generate</button> <button id="back-btn">Back</button>`

    document.getElementById('back-btn').onclick = navigateHome

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

        const btn = document.getElementById('gen-btn')
        btn.disabled = false
        btn.onclick = () => {
            const res = generator.generate(CACHE)
            document.getElementById('result').innerText = res
        }

        btn.click()
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
