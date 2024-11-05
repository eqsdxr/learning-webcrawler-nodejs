const {normalizeURL, getURLfromHTMLcode} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL return hostname', () => {
    const input = 'https://google.com'
    const output = normalizeURL(input)
    const expected_output = 'google.com'
    expect(output).toEqual(expected_output)
})

test('normalizeURL remove trailing slash', () => {
    const input = 'https://google.com/'
    const output = normalizeURL(input)
    const expected_output = 'google.com'
    expect(output).toEqual(expected_output)
})

test('normalizeURL remove capitals', () => {
    const input = 'https://GOOGLE.com/'
    const output = normalizeURL(input)
    const expected_output = 'google.com'
    expect(output).toEqual(expected_output)
})

test('normalizeURL remove http', () => {
    const input = 'http://google.google.com/'
    const output = normalizeURL(input)
    const expected_output = 'google.google.com'
    expect(output).toEqual(expected_output)
})

test('getURLfromHTMLcode', () => {
    const HTMLinput = `
        <html><body>
        <a href='https://google.com/'>click</a>
        </body></html>
    `
    const URLinput = "https://google.com" 
    const output = getURLfromHTMLcode(HTMLinput, URLinput)
    const expected_output = ['https://google.com/']
    expect(output).toEqual(expected_output)
})

test('getURLfromHTMLcode get relative url', () => {
    const HTMLinput = `
        <html><body>
        <a href='/path/'>click</a>
        </body></html>
    `
    const URLinput = "https://google.com" 
    const output = getURLfromHTMLcode(HTMLinput, URLinput)
    const expected_output = ['https://google.com/path/']
    expect(output).toEqual(expected_output)
})

test('getURLfromHTMLcode get absolue url', () => {
    const HTMLinput = `
        <html><body>
        <a href='https://google.com/path/'>click</a>
        </body></html>
    `
    const URLinput = "https://google.com" 
    const output = getURLfromHTMLcode(HTMLinput, URLinput)
    const expected_output = ['https://google.com/path/']
    expect(output).toEqual(expected_output)
})

test('getURLfromHTMLcode get both urls', () => {
    const HTMLinput = `
        <html><body>
        <a href='https://google.com'>click</a>
        <a href='/path/'>click</a>
        </body></html>
    `
    const URLinput = "https://google.com" 
    const output = getURLfromHTMLcode(HTMLinput, URLinput)
    const expected_output = ['https://google.com/', 'https://google.com/path/']
    expect(output).toEqual(expected_output)
})

test('getURLfromHTMLcode wrong urls', () => {
    const HTMLinput = `
        <html><body>
        <a href='unacceptable_url/'>click</a> 
        <a href='unacceptable url'>click</a> 
        </body></html>
    `
    const URLinput = "https://google.com" 
    const output = getURLfromHTMLcode(HTMLinput, URLinput)
    const expected_output = []
    expect(output).toEqual(expected_output)
})