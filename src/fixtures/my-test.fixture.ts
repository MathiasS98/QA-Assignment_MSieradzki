// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { test as base, Page } from "@playwright/test";
import { HomePage } from "@pages/travel-planet-pages/home.page";
import { EnvVars } from "@utils/env-vars";
import { Domain } from "@models/domain.type";

type MyFixtures = {
  homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const siteDomain: Domain = EnvVars.requireEnv("SITE_DOMAIN") as Domain;

    const homePage = new HomePage(page, siteDomain);
    await homePage.visit();
    await homePage.cookiesDialogComponent.acceptCookies();
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
