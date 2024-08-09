import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('Navigate to Form page @tags', async({page}) => {
    const pm = new PageManager(page)
    
    //const navigateTo = new NavigationPage(page) 
    // Create a new instance of the class here using the 'new' keyword and call it
    // It need the parameter passed into the constructor

    await pm.navigateTo().formLayoutsPage()
    // Call the method from the Page Object and you will see the class option there to pick
    // As its a promise it needs an await

    await pm.navigateTo().datePickerPage()

    await pm.navigateTo().smartTablePage()

    await pm.navigateTo().toastrPage()

    await pm.navigateTo().toolTipPage()
})

test('Parameterized Methods @plus', async({page}) => {

    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@testing.com`
    const randomFormWithEmail = `${faker.person.firstName()}.${faker.person.lastName()}@testing.com`

    // const navigateTo = new NavigationPage(page) 
    // const onFormLayoutsPage = new FormLayoutsPage(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    //adding the ability to take a screenshot of the page just after the above code is executed
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    // screenshot of only a section of the page not the whole page
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path:'screenshots/inlineForm.png'})

    //this screenshot can be saved and able to send to someone or another system etc
    const buffer = await page.screenshot()

    // to demonstrate it is working we can send to console log
    console.log(buffer.toString('base64'))
    
    await pm.onFormLayoutsPage().submitBasicFormWithEmailPasswordAndCheckbox(randomFormWithEmail, 'Welcome2', true)

})

test('Block Form Parameterized Method Self Study @smoke @nice', async({page}) => {

    const pm = new PageManager(page)
    const randomFirstName = faker.person.firstName()
    const randomLastname = faker.person.lastName()
    const randomEmailWithFirstAndLastName = `${randomFirstName}.${randomLastname}@testing.com`
    const randomWebsite = `www.${randomFirstName}${randomLastname}.com`

    // const navigateTo = new NavigationPage(page) 
    // const onFormLayoutsPage = new FormLayoutsPage(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingBlockFormWithFirsLastNameEmailAndWebsiteCredentials(randomFirstName, randomLastname, randomEmailWithFirstAndLastName, randomWebsite)
})

test('Date Picker Object @regression', async({page}) => {

    const pm = new PageManager(page)

    // const navigateTo = new NavigationPage(page) 
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatePickerPage = new DatePickerPage(page)

    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(3, 6)
})

test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "forms layouts page");
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, "datepicker page");
    // await pm.navigateTo().smartTablePage()
    // await argosScreenshot(page, "smartTable page");
    // await pm.navigateTo().toastrPage()
    // await argosScreenshot(page, "toastr page");
    // await pm.navigateTo().toolTipPage()
    // await argosScreenshot(page, "toolTip page");
})