import {expect, test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to Form page', async({page}) => {
    const navigateTo = new NavigationPage(page) 
    // Create a new instance of the class here using the 'new' keyword and call it
    // It need the parameter passed into the constructor

    await navigateTo.formLayoutsPage()
    // Call the method from the Page Object and you will see the class option there to pick
    // As its a promise it needs an await

    await navigateTo.datePickerPage()

    await navigateTo.smartTablePage()

    await navigateTo.toastrPage()

    await navigateTo.toolTipPage()
})

test('Parameterized Methods', async({page}) => {
    const navigateTo = new NavigationPage(page) 
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')

    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Stephen Hawkins', 'stephen.hawkings@testing.com', true)

    await onFormLayoutsPage.submitBasicFormWithEmailPasswordAndCheckbox('peter.turner@testing.com', 'Welcome2', true)

})

test('Block Form Parameterized Method Self Study', async({page}) => {
    const navigateTo = new NavigationPage(page) 
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingBlockFormWithFirsLastNameEmailAndWebsiteCredentials('Maxwell', 'David', 'maxwell.david@testing123com', 'www.maxwelldavid.com')
})

test('Date Picker Object', async({page}) => {
    const navigateTo = new NavigationPage(page) 
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(10)
    await onDatePickerPage.selectDatePickerWithRangeFromToday(5, 20)
})