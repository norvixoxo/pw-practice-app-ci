import {expect, test} from '@playwright/test'

// test('example test structure', () => {

// })

// test.describe('test suite 1', () => {

//     test('the first test', () => {

//     })

//     test('the first test', () => {

//     })

//     test('the first test', () => {

//     })

//     test('the first test', () => {

//     })
// })

// test('the first test', async ({page}) => {
//     await page.goto('http://localhost:4200/')
//     await page.getByText('Forms').click()
//     await page.getByText('Form Layouts').click()    
// })

// // Promise requires await infron of the code
// // to use await expression it need to be an "async" function

// test('the second test', async ({page}) => {
//     await page.goto('http://localhost:4200/')
//     await page.getByText('Modal & Overlays').click()
//     await page.getByText('Dialog').click()    
// })

// Hooks and Flow control
// test.beforeAll
// test.beforeEach
// test.afterAll
// test.afterEach

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator Syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    await page.locator('#inputEmail1').click()

    //by Class Value
    page.locator('.shape-rectangle')

    //by Attribute
    page.locator('[placeholder="Email1"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle')
    //note there is no space between the elocator elements being combined

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':test("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')

    /**
     * Notes:
     * 1. With the above when tests are run playwright doesn't do anything with the locators
     * 2. Playwright only actions when there is a method
     * 3. Test with for e.g. .click()
     * 4. Note that because of it is a Promise method it needs await in front of it
     */
})

// User Facing Locators

test('User facing locators', async({page}) => {

    //getByRole
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    //getBylabel
    await page.getByLabel('Email').first().click()
    await page.getByLabel('Password').first().click()

    //getByPlaceholder
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByPlaceholder('Email').first().click()

    //getByText
    await page.getByText('Using the Grid').click()
    await page.getByText('Basic form').click()

    //getByTestId
    await page.getByTestId('SignIn').click()

    //getByTitle
    await page.getByTitle('IoT Dashboard').click()
})

//Child Elements
test('Locating Child Elements', async({page}) => {

    //Using spaces and craddled inside locator
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    //Chaining the locators one by one
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //Combination of regular locators method and user faction loactors
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    //Using Index
    await page.locator('nb-card').nth(3).getByRole('button').click()
    //Not preferable as index may change on page so always find a more unique identifier
})

//Parent Elements

test('Locating Parent Elements', async({page}) => {
    
    //Providing 2nd argument for the locator {hasText: "xxxx"}
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()

    //Providing a 2nd attribute not as text but a loactor
    await page.locator('nb-card', {has: page.locator('#inputPassword2')}).getByRole('textbox', {name: "Password"}).click()

    //Using Filter Method
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()

    //Using Locator as a filter
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    //Using filter to eliminate items that doesn't meet criteria
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByTestId('SignIn2').click()

    
    //XPath (NOT RECOMMENDED) Unless ncessary
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

//Reusing Locators

test('Reusing Locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

//Extracting Values
test('Extracting Values', async({page}) => {
    
    //Single text value

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    /**
     * NOTE:
     * .textContent() helps to locate the content of a button or element 
     * This can then be asserted on via the .toEqual() method
     */


    //All text values

    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 1')

    /**
     * NOTE:
     * .allTextContents() helps look for all the texts in an element
     * This is then put into an array 
     * And it can then be asserted on to see if at elast one of them has the specified text by using the .toContain() method
     */

    //Input value
    
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')


    /***
     * NOTE:
     * the value inputed into a text box in itself is not a text and can not be asserted on directly
     * so the fill value is assigned to a new const with the .inputValue() method
     * this is then asserted on to validate it with the .toEqual() methdd as above
     */


    //Value of the Attribute

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

    /**
     * NOTE:
     * Used where the element changes value based on its status
     * used to help get thte attribute of the element using the .getAttribute('') method
     * it is then asserted on with the .toEqual('') method as above
     */

    const passwordField = await basicForm.getByRole('textbox', {name: "Password"})
    await passwordField.fill('Welcome123')
    const passwordText = await passwordField.textContent
    expect(passwordText).not.toBe(null)
})

//Assertions
test('Assertions', async({page}) => {

    //General Assertions
    const age = 40
    expect(age).toEqual(40)

    /**
     * NOTE:
     * It only uses methods that are GenericAssertions
     * Simply compare left to right
     * Note this does not have an auto-wait functionality and executes as and when/where it is in the code structure
     */

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')


    //Locator Assertions
    await expect(basicFormButton).toHaveText('Submit')

    /**
     * NOTE:
     * It only uses methods that are LocatorAssertions
     * uses the locator instead of the specific text
     * Note these assertions and the methods are promise so need await
     * It has an auto-wait functionality of 5 seconds
     */

    //Soft Assertions
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()

    /**
     * NOTE: 
     * Allows the test to continue even when the assertion fails
     * Helps to find and analyse problem areas
     * Not a good working practice
     */
})

