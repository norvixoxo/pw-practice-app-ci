import {test as base} from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    formsLayoutsPage: string
    pageManager: PageManager
}

// export const test = base.extend<TestOptions>({
//     globalsQaURL: ['', {option:true}],
//     formsLayoutsPage: [async({page}, use) => {
//         await page.goto('/')
//         await page.getByText('Forms').click()
//         await page.getByText('Form Layouts').click()
//         await use('')
//     }, {auto: true}],

//     pageManager: async({page}, use) => {
//         const pm = new PageManager(page)
//         await use(pm)
//     }
// })

/***
 * FIXTURES:
 * fixtures are used to establish the environment for each test, giving the test everything it needs and nothing else.
 * this is a fixture used as an example
 * to help load forms layout page before even browser is loaded
 * Using the page manager also help remove code from there into fixtures
 * this means formLayoutsPage is made ready and available to all test and environments
 */

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option:true}],
    formsLayoutsPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        console.log('TEAR DOWN')
    },

    pageManager: async({page, formsLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})

/**
 * You can also setup a dependency between fixtures
 * This will limit when you want it to be available and for e.g. if you want it be only available and initiated when the pageManager is required then use the dependency
 * to create a dependency we can add the formLayoutsPage as a fixture dependency (parameter) into pageManager
 * This means pageManager will always trigger formLayOutsPage to be initialised first then the page manager will then be initialised
 * And then the instance of the pageManager will then be used to be passed into our test
 * 
 * NOTE:
 * Everything or code before the use('') is a precondition and will be run before the tests run
 * Everything after is a teardown and will be run after the tests have finished
 */