import { Locator, Page } from "@playwright/test";

export class CookiesDialogComponent {
  readonly acceptButton: Locator = this.page.locator(
    "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
  );

  constructor(private page: Page, private componentLocator: Locator) {
    this.page = page;
    this.componentLocator = componentLocator;
  }

  async acceptCookies(): Promise<void> {
    await this.acceptButton.click();
  }
}
