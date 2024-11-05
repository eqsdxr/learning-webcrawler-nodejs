const {JSDOM} = require('jsdom')

function normalizeURL(url) {
    const url_object = new URL(url)
    const hostname_path = `${url_object.hostname}${url_object.pathname}`
    if (hostname_path.length > 0 && hostname_path.slice(-1) === '/') {
        return hostname_path.slice(0, -1) // everything except the last character
    }
    return hostname_path
}

function getURLfromHTMLcode(htmlCode, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlCode)
    const links = dom.window.document.querySelectorAll('a')
    for (const link of links) {
        if (link.href.slice(0, 1) == '/') { // relative url
            try {
                const url_object = new URL(`${baseURL}${link.href}`) // create errors if sth wrong
                urls.push(url_object.href)
            } catch (error) { // error is an object
                console.log(`error. something wrong with the url: ${error.message}`)
            }
        } else { // absolute url
            try {
                const url_object = new URL(link.href) // create errors if something wrong
                urls.push(url_object.href)
            } catch (error) { // an object
                console.log(`error. something wrong with the url: ${error.message}`)
            }
        }

    }
    return urls
}

module.exports = {
    normalizeURL,
    getURLfromHTMLcode,
}