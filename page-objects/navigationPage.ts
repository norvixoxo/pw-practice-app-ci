import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page

    constructor(page: Page){

        this.page = page
    }

    async formLayoutsPage() {
        
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage(){
       
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
    
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async toolTipPage(){
      
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == 'false')
            await groupMenuItem.click()

        /***
         * This creates a smarter way to check to see if the main manu is expanded or collapsed
         * The it takes the necessary action to click to open it if it is closed
         * But if already open (expanded) then it only clicks
         * This is therefore usable for other actions
         * and used to refactor the code and is more readable
         */
    }
}



/***
 * always have a class
 * class name always start with Capital Letter
 * create a field 'readonly page: Page'
 * In the class is a constructor
 * in the constructor you put the parameter
 * assign the instance of the page to the current one using the this. method
 * In JavaScript, this refers to the current object context. 
 * So, this.page = page means you are assigning the value of page to a property named page of the current object.
 * Class need to be exported to be visible to other files in the framework
 */