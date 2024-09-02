import { Page } from "@playwright/test";
import { Domain } from "@models/domain.type";

export abstract class BasePage {
  protected readonly url: string | RegExp;
  protected readonly page: Page;
  protected readonly domain: Domain;

  constructor(page: Page, domain: Domain) {
    this.page = page;
    this.domain = domain;
  }

  async visit(): Promise<void> {
    if (this.url instanceof RegExp) {
      throw new Error("Cannot visit URL defined as RegExp.");
    }

    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  async waitForDOMContentLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForPageUrl(url: string | RegExp = this.url): Promise<void> {
    await this.page.waitForURL(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }
}
