import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";
import { Domain } from "@models/domain.type";
import { MainSearchFormComponent } from "@components/main-search-form.component";
import { translations } from "@config/translations.config";
import { CookiesDialogComponent } from "@components/cookies-dialog.component";
import { HeaderTopMenuComponent } from "@components/header-top-menu.component";

export class HomePage extends BasePage {
  readonly url: string | RegExp;

  readonly cookiesDialog: Locator = this.page.locator(
    "#CybotCookiebotDialogHeader"
  );
  readonly mainHeader: Locator = this.page.locator("h1");
  readonly loginButton: Locator = this.page.getByTestId(
    "header-user-box-toggle-button"
  );
  readonly mainSearchContainer: Locator = this.page.getByTestId("sf-main-hp");
  readonly carousel: Locator = this.page.getByTestId("carousel");
  readonly topOffers: Locator = this.page.getByTestId("hp-top-offers");
  readonly attractiveDestinations: Locator = this.page.locator(
    "div.attractive-destination"
  );
  readonly uniqueSellingPropositions: Locator = this.page.locator(
    ".b-unique-selling-propositions.b-unique-selling-propositions--columns"
  );
  readonly footerNewsletter: Locator =
    this.page.getByTestId("footer-newsletter");
  readonly footerSocials: Locator = this.page.getByTestId("footer-socials");
  readonly footerContact: Locator = this.page.getByTestId("footer-contact");
  readonly footerSitemap: Locator = this.page.getByTestId(
    "menu-footer-wrapper"
  );
  readonly footerLogos: Locator = this.page.getByTestId("footer-logos");
  readonly footerCopywright: Locator =
    this.page.getByTestId("footer-copyright");

  readonly headerTopMenuComponent: HeaderTopMenuComponent;
  readonly mainSearchFormComponent: MainSearchFormComponent;
  readonly cookiesDialogComponent: CookiesDialogComponent;

  constructor(page: Page, domain: Domain) {
    super(page, domain);
    this.url = `${translations[domain].endpoints.home}`;

    this.mainSearchFormComponent = new MainSearchFormComponent(
      page,
      domain,
      this.mainSearchContainer
    );
    this.headerTopMenuComponent = new HeaderTopMenuComponent(page, domain);
    this.cookiesDialogComponent = new CookiesDialogComponent(
      page,
      this.cookiesDialog
    );
  }
}
