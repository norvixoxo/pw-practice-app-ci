import { Page, expect, test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage

//creating a constructor to initialise the pages    
    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    // creating methods to return the instances of these pages
    navigateTo(){
        return this.navigationPage
    }
    onFormLayoutsPage(){
        return this.formLayoutsPage
    }
    onDatePickerPage(){
        return this.datePickerPage
    }
}


/***
 * this helps to remove the creation of and duplication of instances of page objects in tests and new constants in the test each time
 * a PageManager helps to consolidate this all in one place
 * in the constructor we initialise the page object
 * and then also the other objects and pass into it as a parameter this.page to ensure that each instance of the page called in test is what is passed not generic page
 * It also help cascade properlyto he right page
 * Also methods need to be created to return each of the instances of the page objects
 * methods need to be called exactly as they were called in the previous test lessons
 */