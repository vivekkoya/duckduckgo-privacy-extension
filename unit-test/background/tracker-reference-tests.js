const tds = require('../../shared/js/background/trackers.es6')
const tdsStorageStub = require('./../helpers/tds.es6')
const settings = require('../../shared/js/background/settings.es6')

const refTrackers = require('./TEMP/tracker_radar_reference.json')
const refTests = require('./TEMP/domain_matching_tests.json')
const refSurrogates = require('./TEMP/surrogates.js')

describe('Tracker reference tests:', () => {
    beforeAll(() => {
        tdsStorageStub.stub()

        const testLists = [{
            name: 'tds',
            data: refTrackers
        },
        {
            name: 'surrogates',
            data: refSurrogates.surrogates
        }]
        return tds.setLists(testLists)
    })

    const domainTests = refTests.domainTests.tests

    for (const test of domainTests) {
        it(`${test.name}`, () => {
            const rootURL = test.siteURL
            const requestURL = test.requestURL
            const requestType = test.requestType
            const expectRedirect = test.expectRedirect
            const result = tds.getTrackerData(requestURL, rootURL, { type: requestType })
            const action = (result && result.action)
            expect(test.expectAction).toEqual(action)
            if(expectRedirect) {
                expect(expectRedirect).toEqual(result.redirectUrl)
            }
        })
    }
})
