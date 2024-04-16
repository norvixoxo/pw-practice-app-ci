import {expect, test} from '@playwright/test'
import { textTitles } from '../src/fixtures/testData'

test('Drag and Drop with iFrames', async({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
    await page.getByText('Consent',{exact:true}).first().click()

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe') 
    //this helps locate the iframe first as without it Playwright cannot fine the element in line 9 below

   await frame.locator('li', {hasText:"High Tatras 2"}).dragTo(frame.locator('#trash'))
    //so instead of using the page.locator() here we call the iframe.locator() 
    // the dragTo() method is used here and then the locator of the destination is specified

//More precise control
    await frame.locator('li', {hasText:"High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await frame.locator('li', {hasText:"High Tatras 3"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    // await page.waitForTimeout(3000)

    await expect(frame.locator('#trash ul li h5')).toHaveText(textTitles)
    })