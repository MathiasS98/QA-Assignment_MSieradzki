import { translations } from "@config/translations.config";
import { Domain } from "@models/domain.type";
import { Locator, Page } from "@playwright/test";

export class DestinationsListComponent {
  readonly destinationSearchBox: Locator = this.page.getByTestId(
    "sf-destination-picker-popup-search-textbox"
  );
  readonly destinationPickerContent: Locator = this.page.getByTestId(
    "sf-destination-picker-popup-content"
  );
  readonly saveButton: Locator = this.page.getByTestId(
    "sf-destination-picker-popup-save-button"
  );

  constructor(
    private page: Page,
    private domain: Domain,
    private componentLocator: Locator
  ) {
    this.page = page;
    this.domain = domain;
    this.componentLocator = componentLocator;
  }

  async openDestinationPicker(): Promise<void> {
    await this.componentLocator.click();
  }

  async setCountry(country: string): Promise<void> {
    const countryName = translations[this.domain].countries[country].name;
    await this.destinationSearchBox.fill(countryName);
    await this.page.waitForLoadState("domcontentloaded");
    await this.destinationPickerContent
      .locator(".i-checkbox__inner")
      .filter({ hasText: countryName })
      .nth(0)
      .click();
    await this.saveButton.click();
  }

  async setLocation(country: string, location: string): Promise<void> {
    const locationName =
      translations[this.domain].countries[country].regions[location];
    await this.destinationSearchBox.fill(locationName);
    await this.page.waitForLoadState("domcontentloaded");
    await this.destinationPickerContent
      .locator(".i-checkbox__inner")
      .filter({ hasText: locationName })
      .nth(0)
      .click();
    await this.saveButton.click();
  }
}
