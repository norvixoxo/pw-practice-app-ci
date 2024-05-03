import {Page, expect, test} from '@playwright/test'
import { NavigationPage } from './navigationPage'

export class DatePickerPage{
    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){

        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
    
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})
        const expectedYear1 = date.getFullYear()
        const dateToAssert1 = `${expectedMonthShort} ${expectedDate}, ${expectedYear1}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear1} `

        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        await expect(calendarInputField).toHaveValue(dateToAssert1)
    }
}