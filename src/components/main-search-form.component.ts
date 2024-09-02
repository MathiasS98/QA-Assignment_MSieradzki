import { Domain } from "@models/domain.type";
import { Page, Locator } from "@playwright/test";
import { DestinationsListComponent } from "@components/destinations-list.component";
import { DatePickerComponent } from "@components/date-picker.component";
import { VacationsPage } from "@pages/travel-planet-pages/vacations.page";

export class MainSearchFormComponent {
  readonly destination: Locator = this.page.getByTestId(
    "sf-destination-picker-textbox"
  );
  readonly date: Locator = this.page.getByTestId("sf-datepicker-textbox");
  readonly transportation: Locator = this.page.getByTestId(
    "sf-transportation-picker-textbox"
  );
  readonly passenger: Locator = this.componentLocator.locator(
    "div.f-main-search__wrapper-field.f-main-search__wrapper-field--passengers"
  );
  readonly submitButton: Locator = this.page.getByTestId("sf-submit-button");

  constructor(
    private page: Page,
    private domain: Domain,
    private componentLocator: Locator
  ) {
    this.page = page;
    this.componentLocator = componentLocator;
    this.domain = domain;
  }

  private async setDestination(
    country: string,
    location?: string
  ): Promise<void> {
    const destinationsListComponent: DestinationsListComponent =
      new DestinationsListComponent(
        this.page,
        this.domain,
        this.componentLocator.getByTestId("sf-destination-picker-textbox")
      );
    await destinationsListComponent.openDestinationPicker();
    if (location) {
      await destinationsListComponent.setLocation(country, location);
    } else {
      await destinationsListComponent.setCountry(country);
    }
  }

  private async setDate(
    dateRangeFrom: string,
    dateRangeTo: string
  ): Promise<void> {
    const datePickerComponent = new DatePickerComponent(
      this.page,
      this.componentLocator.getByTestId("sf-datepicker-textbox")
    );
    await datePickerComponent.openDatePicker();
    await datePickerComponent.setDateRange(dateRangeFrom, dateRangeTo);
  }

  private async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async searchForVacations(
    destination: {
      country: string;
      localization?: string;
    },
    dateRange: { dateFrom: string; dateTo: string }
  ): Promise<VacationsPage> {
    await this.setDestination(destination.country, destination.localization);
    await this.setDate(dateRange.dateFrom, dateRange.dateTo);
    await this.submitForm();
    await this.page.waitForLoadState("domcontentloaded");
    return new VacationsPage(this.page, this.domain);
  }
}
