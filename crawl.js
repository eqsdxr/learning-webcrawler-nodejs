const {JSDOM} = require('jsdom')

async function crawlPage(baseURL, current_url, pages) {
    console.log(`crawling ${current_url}`)

    const base_url_object = new URL(baseURL)
    const current_url_object = new URL(current_url)
    if (base_url_object.hostname !== current_url_object.hostname){
        return pages
    }

    const normalized_current_url = normalizeURL(current_url)
    if (pages[normalized_current_url] > 0) {
        pages[normalized_current_url]++
        return pages
    }

    pages[normalized_current_url] = 1

    // console.log(await response.text())

    try {
        const response = await fetch(current_url)

        if (response.status > 399) {
            console.log(`error, status code: ${response.status}`)
            return pages
        }

        const contentType = response.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html response on page ${current_url}. content type ${contentType}`)
            return pages
        }

        const html_body = await response.text()

        const next_urls = getURLfromHTMLcode(html_body, baseURL)

        for (const next_url of next_urls) {
            pages = await crawlPage(baseURL, next_url, pages)
        }
    }
    catch (error) {
        console.log(`error ${error.message} on the page: ${current_url}`)
    }

    return pages

}

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
    crawlPage,
}