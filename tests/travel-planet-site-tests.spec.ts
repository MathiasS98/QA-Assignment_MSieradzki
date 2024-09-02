import { test, expect } from "@fixtures/my-test.fixture";
import { DateFormat } from "@utils/date-format";

test("Verify presence of essential elements on home page", async ({
  homePage,
}) => {
  await test.step("Verify visibility of search component", async () => {
    await expect.soft(homePage.mainSearchContainer).toBeVisible();
    await expect
      .soft(homePage.mainSearchFormComponent.destination)
      .toBeVisible();
    await expect.soft(homePage.mainSearchFormComponent.date).toBeVisible();
    await expect
      .soft(homePage.mainSearchFormComponent.transportation)
      .toBeVisible();
    await expect.soft(homePage.mainSearchFormComponent.passenger).toBeVisible();
  });

  await test.step("Verify visibility of other essential elements", async () => {
    await expect.soft(homePage.mainHeader).toBeVisible();
    await expect.soft(homePage.loginButton).toBeVisible();
    await expect.soft(homePage.footerSocials).toBeVisible();
    await expect.soft(homePage.carousel).toBeVisible();
    await expect.soft(homePage.topOffers).toBeVisible();
    await expect.soft(homePage.attractiveDestinations).toBeVisible();
    await expect.soft(homePage.uniqueSellingPropositions).toBeVisible();
    await expect.soft(homePage.footerContact).toBeVisible();
    await expect.soft(homePage.footerNewsletter).toBeVisible();
    await expect.soft(homePage.footerSitemap).toBeVisible();
    await expect.soft(homePage.footerLogos).toBeVisible();
    await expect.soft(homePage.footerCopywright).toBeVisible();
  });
});

test("Verify login form error message on incorrect credentials", async ({
  homePage,
}) => {
  const loginModalComponent =
    await homePage.headerTopMenuComponent.clickLoginButton();

  await test.step("Fill login form with incorrect credentials and submit", async () => {
    await expect(loginModalComponent.modalWindow).toBeVisible();
    await loginModalComponent.fillEmail("test@test.pl");
    await loginModalComponent.fillPassword("password123");
    await loginModalComponent.submitLoginForm();
    await expect(loginModalComponent.errorMassage).toBeVisible();
  });
});

test("Search for vacations for week ahead", async ({ page, homePage }) => {
  const destinationCountry = "Egypt";

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  const nextWeekDate = new Date();
  nextWeekDate.setDate(startDate.getDate() + 8);

  const formattedStartDate = DateFormat.formatDateToString(startDate);
  const formattedNextWeekDate = DateFormat.formatDateToString(nextWeekDate);

  const vacationsPage =
    await homePage.mainSearchFormComponent.searchForVacations(
      {
        country: destinationCountry,
      },
      { dateFrom: formattedStartDate, dateTo: formattedNextWeekDate }
    );
  await test.step("Verify redirection to vacations page", async () => {
    await expect(page).toHaveURL(new RegExp(vacationsPage.url));

    await expect(vacationsPage.searchResultsContainer).toBeVisible();
  });
  await test.step("Go to next page", async () => {
    await vacationsPage.goToNextPage();
    await expect(vacationsPage.searchResultsContainer).toBeVisible();
    await expect(vacationsPage.currentPageButton).toContainText("2");
  });
  await test.step("Open first offer", async () => {
    const vacationOfferDetailsPage = await vacationsPage.openOfferChosenByOrder(
      0
    );

    await expect(page).toHaveURL(new RegExp(vacationOfferDetailsPage.url));

    const offerTitleHeaderText =
      await vacationOfferDetailsPage.offerTitleHeader.textContent();

    expect
      .soft(offerTitleHeaderText)
      .toBe(vacationOfferDetailsPage.expectedOfferTitleHeader);

    const offerDestinationHeaderText =
      await vacationOfferDetailsPage.offerDestinationHeader.textContent();

    expect(offerDestinationHeaderText).toContain(
      vacationOfferDetailsPage.expectedDestinationDetailsHeader
    );
  });
});
