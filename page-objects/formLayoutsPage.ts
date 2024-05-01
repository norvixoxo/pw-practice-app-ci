import { Page } from "@playwright/test";

export class FormLayoutsPage {

    private readonly page: Page

    constructor(page: Page){

        this.page = page
    }
    /**
     * This method fills out the Using the Grid form with user details
     * @param email - valid email format for the test user
     * @param password - meet the required minimum
     * @param optionText - which radio should be selected
     */
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * This method fills out the Inline form with user details
     * @param name - should be first and last name
     * @param email - valid email format for the test user
     * @param rememberMe - true or false if the user session to be saved
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }

    /**
     * 
     * @param email - valid email format for the test user
     * @param password - meet the required minimum
     * @param checkMeOut - true or false if the check me out checkbox need to be ticked
     */
    async submitBasicFormWithEmailPasswordAndCheckbox(email: string, password: string,checkMeOut: boolean){
        const basicForm = this.page.locator('nb-card', {hasText: "Basic form"})
        await basicForm.getByRole('textbox', {name: "Email"}).fill(email)
        await basicForm.getByRole('textbox', {name: "Password"}).fill(password)
        if(checkMeOut)
            await basicForm.getByRole('checkbox').check({force: true})
        await basicForm.getByRole('button').click()
    }

    /**
     * This method fills out the block form with the credentials
     * @param firstName - first name of the test user
     * @param lastName - last name of the test user
     * @param email - valid email format for the test user
     * @param website - website of the test user
     */
    async submitUsingBlockFormWithFirsLastNameEmailAndWebsiteCredentials(firstName: string, lastName: string, email: string, website: string){
        const blockForm = this.page.locator('nb-card', {hasText: "Block form"})
        await blockForm.getByRole('textbox', {name: "First Name"}).fill(firstName)
        await blockForm.getByRole('textbox', {name: "Last Name"}).fill(lastName)
        await blockForm.getByRole('textbox', {name: "Email"}).fill(email)
        await blockForm.getByRole('textbox', {name: "Website"}).fill(website)
        await blockForm.getByRole('button').click()
    }

}
