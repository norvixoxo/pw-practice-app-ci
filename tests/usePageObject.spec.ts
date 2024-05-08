import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to Form page', async({page}) => {
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

test('Parameterized Methods', async({page}) => {

    const pm = new PageManager(page)

    // const navigateTo = new NavigationPage(page) 
    // const onFormLayoutsPage = new FormLayoutsPage(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('Stephen Hawkins', 'stephen.hawkings@testing.com', true)

    await pm.onFormLayoutsPage().submitBasicFormWithEmailPasswordAndCheckbox('peter.turner@testing.com', 'Welcome2', true)

})

test('Block Form Parameterized Method Self Study', async({page}) => {

    const pm = new PageManager(page)

    // const navigateTo = new NavigationPage(page) 
    // const onFormLayoutsPage = new FormLayoutsPage(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingBlockFormWithFirsLastNameEmailAndWebsiteCredentials('Maxwell', 'David', 'maxwell.david@testing123com', 'www.maxwelldavid.com')
})

test('Date Picker Object', async({page}) => {

    const pm = new PageManager(page)

    // const navigateTo = new NavigationPage(page) 
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatePickerPage = new DatePickerPage(page)

    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(3, 6)
})