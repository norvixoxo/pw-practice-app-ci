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

//ALTERNATIVE METHOD RECOMMENDEND BY PLAYWRIGHT TO ORGANISE AND REFACTOR THE CODE (Same as above)

// export class NavigationPage {

//     readonly page: Page
//     readonly formLayoutMenuItem: Locator
//     readonly datePickerMenuItem: Locator
//     readonly smartTableMenuItem: Locator
//     readonly toastrPageMenuItem: Locator
//     readonly toolTipMenuItem: Locator

//     //Playwright recommends having the locators separate from the functional methods
//     // So the above is created and then assign the to it
//     // Main benefit of this metho is that you have re-use these via export & import in other files so you don't end up repeating or duplicating yourslef

//     constructor(page: Page){

//         this.page = page
//         this.formLayoutMenuItem = page.getByText('Form Layouts')
//         this.datePickerMenuItem = page.getByText('Datepicker')
//         this.smartTableMenuItem = page.getByText('Smart Table')
//         this.toastrPageMenuItem = page.getByText('Toastr')
//         this.toolTipMenuItem = page.getByText('Tooltip')

//         // Inside the locator is assigned to the property in the constructor
//         // this is done for all the others 
//     }

//     async formLayoutsPage() {
        
//         await this.selectGroupMenuItem('Forms')
//         await this.formLayoutMenuItem.click()
//         //with the above done you can call them and names inside the functional methods
//     }

//     async datePickerPage(){
       
//         await this.selectGroupMenuItem('Forms')
//         await this.page.waitForTimeout(1000)
//         await this.datePickerMenuItem.click()
//     }

//     async smartTablePage(){
    
//         await this.selectGroupMenuItem('Tables & Data')
//         await this.smartTableMenuItem.click()
//     }

//     async toastrPage(){
        
//         await this.selectGroupMenuItem('Modal & Overlays')
//         await this.toastrPageMenuItem.click()
//     }

//     async toolTipPage(){
      
//         await this.selectGroupMenuItem('Modal & Overlays')
//         await this.toolTipMenuItem.click()
//     }

//     private async selectGroupMenuItem(groupItemTitle: string){
//         const groupMenuItem = this.page.getByTitle(groupItemTitle)
//         const expandedState = await groupMenuItem.getAttribute('aria-expanded')
//         if(expandedState == 'false')
//             await groupMenuItem.click()

//         /***
//          * This creates a smarter way to check to see if the main manu is expanded or collapsed
//          * The it takes the necessary action to click to open it if it is closed
//          * But if already open (expanded) then it only clicks
//          * This is therefore usable for other actions
//          * and used to refactor the code and is more readable
//          */
//     }
// }

/***
 * With this method it looks nice but:
 * if you have dozens of items the list becomes too huge
 * Not easy to read
 * devs can create duplicates for same locator
 * And in some functions you can not reove the locators so you end up having mix and mash methods
 * it also goes agains the Keep It Simple Stupid (KISS) rule
 * So keep the locators in the functional methods
 */