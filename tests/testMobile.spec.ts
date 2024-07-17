import {test} from '@playwright/test'

test('Input Fields', async({page}, testInfo) => {
    await page.goto('/')
    await page.locator('.sidebar-toggle').click()
    await page.locator('.sidebar-toggle').click()
    // if(testInfo.project.name == 'mobile'){
    //     await page.locator('.sidebar-toggle').click()
    //     await page.locator('.sidebar-toggle').click()
    // }
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    // if(testInfo.project.name == 'mobile'){
    //     await page.locator('.sidebar-toggle').click()
    // }
    await page.locator('.sidebar-toggle').click()
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
    await usingTheGridEmailInput.fill('test@testing.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@testing.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test3@testing.com')
    // await usingTheGridEmailInput.clear()

})