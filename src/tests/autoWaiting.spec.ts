import {expect, test} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'


test.beforeEach(async({page}, testInfo) => { //adding testInfo as another argument can be used to apply and increase timeout for a suite
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) //this line adds the extra time for all/every tests in suite
})

test('Auto Waiting', async({page}) => {
    const sucessButton = page.locator('.bg-success')

    //await sucessButton.click()

    //const text = await sucessButton.textContent()

    // await sucessButton.waitFor({state: "attached"}) //using the waitFor({state: ""})
    // const text = await sucessButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(sucessButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}) // add timeout as a parameter
})

test('Alternative Waits', async ({page}) => {
    const sucessButton = page.locator('.bg-success')

//__wait for element
    await page.waitForSelector('.bg-success')

//__wait for particular response
    /**
     * getting from the network tab in console
     * response  and header
     * provide the url
     */
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

//__wait for network calls to be completed ('NOT RECOMMENDED') if some apis are stuck(non essential) then tests will be stuck 
    //await page.waitForLoadState('networkidle')

//__wait for time out (hared coding the timeout)
    //await page.waitForTimeout(16000)

//__wait for url (used when you are navigating and need to have a website loadup)
    //await page.waitForURL('http://uitestingplayground.com/ajax')

//__wait for other alternatives(explore these)
    /**
     * waitForEvent
     * waitForFunction
     * waitForRequest
     */
    
    const text = await sucessButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

    /**
     * NOTES:
     * playwright has automatic wait times for certain conditions to be met
     * Has a limited number of methods that support auto wait and can be found on the documentation
     * https://playwright.dev/docs/actionability
     * if interaction with elements that do not have auto wait for eg .allTextContents you can add other waits
     * e.g giving a state
     * other alternative waits are there to be used as well
     */
})

test('Time Outs', async({page}) => {
    //test.setTimeout(10000)
    //can set a timeout for the test inside the test which will override the global time set in playwright.config.ts
    
    //test.slow()
    //this will triple the default timeout and helps remove the flakiness
    
    const sucessButton = page.locator('.bg-success')
    
    await sucessButton.click()

    //await sucessButton.click({timeout: 16000})
    //can insert timeout in the method/action which will override actionTimeout set in the playwright.configts

})
