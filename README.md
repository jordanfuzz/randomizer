# [random.cooperplanet.com](https://random.cooperplanet.com/)

A collection of random word and name generators:
- Videogame name generator - Based on [videogamena.me](https://www.videogamena.me/about.html)
- Masonic title generator
- Florida man headline generator
- OSRS cat name generator
- Band name generator - Based on [Wordlab Band Name Generator](https://www.wordlab.com/archives/rock-band-names-list/)
- Anime Title Generator

A few others may move over from separate projects.


### Local dev

```sh
docker build -t randomizer . && docker run --rm -it -p 8080:80 -v $(pwd)/src:/usr/share/nginx/html randomizer
```
