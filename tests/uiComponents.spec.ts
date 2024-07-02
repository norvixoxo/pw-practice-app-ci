import {expect, test} from '@playwright/test'

//if you want to run the whole spec file in parallel you can put the below
test.describe.configure({mode: "parallel"})

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test.describe('Form Layouts page', async() => {
    //using the test.describe.parallel sets the these test inside this test to run in parallel and everything else is sequentially

    //manually sets the amount of retries for the test locally instead of the global setting in playwright.config.ts file
    test.describe.configure({retries: 2})

    // if tests depend on each other then you can run them in sequential order and if one fails the other will not run but skip.
    //note its not best practice and can be done as below
    test.describe.configure({mode: 'serial'})

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input Fields', async({page}, testInfo) => {
        if (testInfo.retry){
            //do something
            //insert code here where it is necessary to clean dB before test retry etc
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill('test@testing.com')
        await usingTheGridEmailInput.clear()
        //to clear it you have to call the locator again to clear it. you cannot chain the clear with the fill.

        // Using to simulate the typing of individual letters into the input field
        await usingTheGridEmailInput.pressSequentially('test2@testing.com')
        await usingTheGridEmailInput.clear()

        //can also be done with delay inbtween the typing of letters by adding another argument
        await usingTheGridEmailInput.pressSequentially('test3@testing.com', {delay: 500})
        await usingTheGridEmailInput.clear()

    //Assertions in the Input Fields
        
        //generic assertions
        await usingTheGridEmailInput.pressSequentially('test4@testing.com', {delay: 500})
        const inputValueText = await usingTheGridEmailInput.inputValue()
        expect(inputValueText).toEqual('test4@testing.com')

        //locator assertions
        await expect(usingTheGridEmailInput).toHaveValue('test4@testing.com')
    })

    test('Radio Buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        
        //getbyLabel
        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        //because radio button is visiblky hidden we override it with {force: true}

        //getByRole
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})

    //Assertions
        //General assertions (isChecked)
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect(radioStatus).toBeTruthy

        //Locator assertions(toBeChecked)
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()
        expect(radioStatus).toBeTruthy

        //Validate that when you select another radio button the previous one is no longer checked or selected
        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy
        
    })
})

test('Checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true})
    //Just clicks the checkbox without checking the status of the checkbox


    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})
    /***
     * this checks the currect status of the checkbox and if it is already checked it will just leave it as it is
     * but if it is unchecked then it will ensure that it is checked(ticked)
     * This is the difference of click() and check()
     * */  

    await  page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
    // this also check the status of the checkbox and if already checked/ticked it performs uncheck

    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).uncheck({force: true})
    await page.getByRole('checkbox', {name: "Show toast with icon"}).uncheck({force: true})


    //To perform a test to check all the checkboxes is as below;
    const allBoxes =page.getByRole('checkbox')
    for(const box of await allBoxes.all()){  //the method .all() helps list all the checkboxes into an array and its a promise so it needs an await
        await box.check({force: true}) //the check method is a promise and therefore needs an await
        expect(await box.isChecked()).toBeTruthy() //this is an assertion to check that checkbox is checked and as isChecked() is a Promise it needs an await
    }

    const allBoxes2 =page.getByRole('checkbox')
    for(const box of await allBoxes2.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
})

test('Lists and Dropdowns', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') //used when the list has a UL tag
    page.getByRole('listitem') //used when the list has a LI tag

// because we have UL in this DOM we can use the getByRole() approach

    const optionList = page.locator('nb-option-list').locator('nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Dark"}).click()
    
//here we are using this to find the parent and the child locators in sequence

//Better compact way to do the same thing is as below
    const optionList1 = page.locator('nb-option-list nb-option')
    await dropDownMenu.click()
    await expect(optionList1).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList1.filter({hasText: "Cosmic"}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

//To validate and check the colours of all the backgrounds when they are selected
    const colours = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Corporate": "rgb(255, 255, 255)",
        "Cosmic":"rgb(50, 50, 89)"
    }

    await dropDownMenu.click()
    for(const colour in colours){
        await optionList1.filter({hasText: colour}).click()
        await expect(header).toHaveCSS('background-color', colours[colour])
        if(colour != "Cosmic")
            await dropDownMenu.click()
    }
})

test('Tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    /***
     * To get the tooltip element it is hard to find it by inspect
     * on macOS us CMD + \ keys whilst in the sources tab in inspect
     * it freezes the browser in debug mode and allow you to explore and find the element
     * in Windows use the F8 function key as above
     */
    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()
    //.hover() is a promise and needs an await and it helps simulate hovering a mouse over the item/element

    page.getByRole('tooltip') //it only works if you have a role "tooltip" created in the elements or app.
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})

test('Tooltips Self Study', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCardCoulours = page.locator('nb-card', {hasText: 'Colored Tooltips'})
    await toolTipCardCoulours.getByRole('button', {name: "Primary"}).hover()
    
    const toolTipCardCouloursText = await page.locator('nb-tooltip').textContent()
    expect(toolTipCardCouloursText).toEqual('This is a tooltip')
})

test('Dialog Boxes', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //create a listener to help override playwright cancelling the diaglogbox and accept it using the format below
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    // running it works but the row is not deleted as playwright recognises it as a browser diaglog box and cancels it
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

    /***
     * Notes:
     * When using a web dialog box then automate as usual by finding the element locator etc
     * But if it is a browser locatoer then you need to put in a listener as per the format above in lines 177-181
     * This helps action it and stop playwright from automatically cancelling the browser dialog box
     */
})

test('Web Tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

//1. How to get the row by any text in this row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear() 
    //using this method because once the edit is clicked the email etc in DOM are no onger text anymore but has become and input field
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

//2. Get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    //Code till before filter will return 2 elements and therefore fail
    //adding the filter with the row element abd index and then text narrows it down to one element 
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear() 
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@testing.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@testing.com')

//3. Test the filter of the table and assertion to see if it gives the correct result
    const ages = ['20', '30', '40', '200']

    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear() 
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)

        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()){

            const cellValue = await row.locator('td').last().textContent()

            if(age === '200'){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else{
                expect(cellValue).toEqual(age)
            }
        }
    }
    /***
     * NOTES:
     * We used test data to create an array
     * Use the for loop to through the locatrs and the test data
     * We then created another loop inside that to loop through each row that is the result of the first one
     * create a locator to get all the rows in line 226
     * Out of those rows to create an array using the .all() method in line 228
     * row is the iterator 
     * line 23 creasts a constant for the value that you want to interact with
     * use can use conditions as in line 232- 235 to validate your assertions
     */
})

test('Date Picker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

/**
 * when you inspect the date picker you will be tempted to just pick the locator for the date month calendar and pick the date
 * you will notice that it has previous month dates in there as well
 * looking at the locators you can see there are different class names for last month date and this current month dates
 * get element locator for current month the whole class and action as below example
 * when you provide the value of 1 it will fail as it will find lots of 1s even in 12 as well
 * it only searches for partial matches 
 * to fix that you provide it with a new variable/parameter of {exact: true}
 * you can perform an assertion on using the .toHaveValue('Apr 1, 2020') method
 */

    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    await expect(calendarInputField).toHaveValue('May 1, 2024')

/***
 * Automating dates
 * You can use google to search for js dates which provides you tools to use
 * You can play around with it, run and test it and use the format that you need by copying it to your code
 * So instead of hard coding the date in the code you can use this to help make it more flexible and more intelligent
 */

    await calendarInputField.clear()
    await calendarInputField.click()

    let date = new Date()
// this is the functionality that is the date constructor in javascript. new helps it construct and add it to another var

    date.setDate(date.getDate() + 8)

// using this date variable now you can use the other method available as in the js website tool

    const expectedDate = date.getDate().toString()

// this creates a new constant for the new date but gets it and converts it into a string

    const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})

// this is a new constant for the month to be converted into the short form

    const expectedYear = date.getFullYear()

//this gets the full year constant

    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

// using concatenation we can contrust the date in the format we need it to be soit can be used to make the assertion 
    
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)

/***
 * Note when we want to select ta date that goes into the next month the test fails and to correct that and to solve it the solution is below
 */

    await calendarInputField.clear()
    await calendarInputField.click()

    date.setDate(date.getDate() + 300)
    const expectedDate1 = date.getDate().toString()
    const expectedMonthShort1 = date.toLocaleDateString('En-US', {month: 'short'})
    const expectedYear1 = date.getFullYear()
    const dateToAssert1 = `${expectedMonthShort1} ${expectedDate1}, ${expectedYear1}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear1} `

    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate1, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(dateToAssert1)
})

test('Sliders', async({page}) => {

// 1. Update attribute
    const tempGuage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    //gives us the locator of the attribute.

    //to have accesss to the cx and cy values we need to perform and evaluation of the javascript expression
    await tempGuage.evaluate( nodeexpressionevalute => {
        nodeexpressionevalute.setAttribute('cx', '63.055')
        nodeexpressionevalute.setAttribute('cy', '34.275')
        // running the test at the point only will set the circle to the value we gave but the blue line and tempwill not reflect correctly
   })
    //to correct we perform a single click on it and it should reflect correctly
    await tempGuage.click()

// 2. Mouse Movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')

    //good practice to esnure that the element you want to work on is in full view on the page properly using
    await tempBox.scrollIntoViewIfNeeded()

    // the bounding box helps create and X and Y axis area where you can click your mouse. 
    // Only limit is the browser view as you can click outside the bounding box
    //hence the reason why we did the scrollIntoViewIfNeeded() method earlier

   const box = await tempBox.boundingBox()

   // you can then set the boundingBox() to a variable which will enable you to call methods on it later/after

   const x = box.x + box.width / 2
   const y = box.y + box.height / 2
   // this defins the centre of the box as the starting point

   await page.mouse.move(x, y) //moves the mouse to the centre
   await page.mouse.down() //simulates the left click button on the mouse to the location above which is the centre
   await page.mouse.move(x + 100, y) //moving the mouse to the right (horizontally) so Y value remains unchanged
   await page.mouse.move(x + 100, y + 100) //moving the mouse down (vertically) from where it was in the previous position
   await page.mouse.up() //this simulates the release of the mouse
   //reversing to get it to the lowest possible
   await page.mouse.move(x, y)
   await page.mouse.down()
   await page.mouse.move(x - 100, y)
   await page.mouse.move(x - 100, y + 100)
   await page.mouse.up()
   await expect(tempBox).toContainText('13')
})
