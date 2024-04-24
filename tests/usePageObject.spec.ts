import {expect, test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

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