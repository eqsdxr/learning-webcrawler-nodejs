function normalizeURL(url) {
    const url_object = new URL(url)
    const hostname_path = `${url_object.hostname}${url_object.pathname}`
    if (hostname_path.length > 0 && hostname_path.slice(-1) === '/') {
        return hostname_path.slice(0, -1) // everything except the last character
    }
    return hostname_path
}

module.exports = {
    normalizeURL
}