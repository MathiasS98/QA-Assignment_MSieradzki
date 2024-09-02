import { Locator, Page } from "@playwright/test";

export class DatePickerComponent {
  readonly saveButton: Locator = this.page.getByTestId(
    "sf-datepicker-popup-save-button"
  );

  constructor(private page: Page, private componentLocator: Locator) {
    this.page = page;
    this.componentLocator = componentLocator;
  }

  async openDatePicker(): Promise<void> {
    await this.componentLocator.click();
  }

  /**
   *Accepted date format 'dd-mm-yyyy'
   */
  async setDateRange(startDate: string, endDate: string): Promise<void> {
    const [startDay, startMonth, startYear] = startDate.split("-");
    const [endDay, endMonth, endYear] = endDate.split("-");

    const startSelector = `#datepicker-calendar-day-${startDay}-${startMonth}-${startYear}`;
    const endSelector = `#datepicker-calendar-day-${endDay}-${endMonth}-${endYear}`;

    await this.page.click(startSelector);
    await this.page.click(endSelector);

    await this.saveButton.click();

    //TODO: Implement month change functionality
  }
}
