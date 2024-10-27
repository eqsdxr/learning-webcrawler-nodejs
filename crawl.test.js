const {normalizeURL} = require('./crawl.js')
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
    const input = 'https://google.google.com/'
    const output = normalizeURL(input)
    const expected_output = 'google.google.com'
    expect(output).toEqual(expected_output)
})