import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";
import { Domain } from "@models/domain.type";
import { translations } from "@config/translations.config";
import { VacationOfferDetailsPage } from "@pages/travel-planet-pages/vacation-offer-details.page";
import { DestinationDetails } from "@models/destination-details.type";

export class VacationsPage extends BasePage {
  readonly url: string;

  readonly pageMainHeader: Locator = this.page.locator("h1");
  readonly nextPageButton: Locator = this.page
    .locator("#search-results-pagination")
    .locator("button.pagination__link--next");
  readonly searchResultsContainer: Locator = this.page.locator(
    "#search-form-result-boxes"
  );
  readonly paginationPanel: Locator = this.page.locator("ul.pagination__list");
  readonly currentPageButton: Locator = this.paginationPanel.locator(
    "span.pagination__current"
  );

  private offers: Locator = this.page.locator("article.b-product-list-2");
  private offersTitles: Locator = this.offers.locator("h2");
  private offersDestinations: Locator = this.page.locator(
    "p.b-product-list-2__location"
  );

  constructor(page: Page, domain: Domain) {
    super(page, domain);
    this.url = `${translations[domain].endpoints.vacations}`;
  }

  async goToNextPage(): Promise<void> {
    await this.nextPageButton.click();
  }

  async openOfferChosenByOrder(
    order: number
  ): Promise<VacationOfferDetailsPage> {
    const chosenOfferTitle: Locator = this.offersTitles.nth(order);
    const chosenOfferDestinationDetails: string = await this.offersDestinations
      .nth(order)
      .textContent();

    const parsedDestinationDetails: DestinationDetails =
      this.parseDestinationDetails(chosenOfferDestinationDetails);

    const offerTitleText: string = await chosenOfferTitle.textContent();

    await chosenOfferTitle.click();

    return new VacationOfferDetailsPage(
      this.page,
      this.domain,
      parsedDestinationDetails,
      offerTitleText
    );
  }
  async openOfferChosenByTitle(
    offerTitle: string
  ): Promise<VacationOfferDetailsPage> {
    const chosenOffer: Locator = this.offers.filter({
      hasText: offerTitle,
    });
    const chosenOfferTitle: Locator = this.offersTitles.filter({
      hasText: offerTitle,
    });
    const chosenOfferDestinationDetails: string = await chosenOffer
      .locator("p.b-product-list-2__location")
      .textContent();

    const parsedDestinationDetails: DestinationDetails =
      this.parseDestinationDetails(chosenOfferDestinationDetails);

    const offerTitleText: string = await chosenOfferTitle.textContent();

    await chosenOfferTitle.click();
    return new VacationOfferDetailsPage(
      this.page,
      this.domain,
      parsedDestinationDetails,
      offerTitleText
    );
  }

  private parseDestinationDetails(
    destinationDetailsString: string
  ): DestinationDetails {
    const [country, region, place] = destinationDetailsString
      .split(" - ")
      .map((part) => part.trim());

    const destination: DestinationDetails = {
      country,
      region: region,
    };

    if (place) {
      destination.place = place;
    }

    return destination;
  }
}
