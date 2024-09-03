import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";
import { Domain } from "@models/domain.type";
import { DestinationDetails } from "@models/destination-details.type";
import { translations } from "@config/translations.config";
import { StringConverters } from "@utils/string-converters";

export class VacationOfferDetailsPage extends BasePage {
  readonly url: RegExp;
  readonly expectedOfferTitleHeader: string;
  readonly expectedDestinationDetailsHeader: string;
  readonly destinationDetails: DestinationDetails;

  readonly offerTitleHeader: Locator = this.page.locator(
    "h1.b-product-detail__inline-title"
  );
  readonly offerDestinationHeader: Locator = this.page.locator(
    "h2.b-product-detail__destination"
  );

  constructor(
    page: Page,
    domain: Domain,
    destinationDetails: DestinationDetails,
    offerTitleText: string
  ) {
    super(page, domain);

    const countryEndpoint: string = StringConverters.removeAccents(
      destinationDetails.country
    ).toLowerCase();
    const regionEndpoint: string = StringConverters.removeAccents(
      destinationDetails.region
    ).toLowerCase();

    this.url = new RegExp(
      `/${translations[domain].endpoints.hotels}/${countryEndpoint}/${regionEndpoint}(?:/[^/]+)?/${translations[domain].endpoints.offer}/\\?s_offer_id=.*`
    );

    this.expectedOfferTitleHeader = offerTitleText.trim();
    this.destinationDetails = destinationDetails;
    this.expectedDestinationDetailsHeader =
      this.getExpectedDestinationDetails();
  }

  private getExpectedDestinationDetails() {
    if (this.destinationDetails.place === undefined) {
      return `${this.destinationDetails.country}, ${this.destinationDetails.region}`;
    } else {
      return `${this.destinationDetails.country}, ${this.destinationDetails.region}, ${this.destinationDetails.place}`;
    }
  }
}
