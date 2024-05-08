import { Page, expect, test} from '@playwright/test'

export class HelperBase{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}

/***
 * This helps create functions that you want to recycle and reuse in different and several areas i nthe framework
 * this is called in the page object file by using the "extend" keyword
 * this is a method in Object Orientated Programming (OOP) called of INHERITANCE
 * then resolve the syntax and format issues etc
 * since using inheritance we change the syntax from calling the instance of the page object from "this.page = page " to "super(page)" in the constructor
 * 
 */