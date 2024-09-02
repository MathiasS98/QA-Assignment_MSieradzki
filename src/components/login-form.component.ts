import { Domain } from "@models/domain.type";
import { Locator, Page } from "@playwright/test";

export class LoginFormComponent {
  readonly modalWindow: Locator = this.page.locator(
    "div.modal.modal--xs.modal--dismiss.is-opened"
  );
  readonly suibmitLoginButton: Locator =
    this.page.getByTestId("login-form-submit");
  readonly emailInput: Locator = this.page.getByTestId("login-form-email");
  readonly passwordInput: Locator = this.page.getByTestId(
    "login-form-password"
  );
  readonly errorMassage: Locator = this.modalWindow.locator(
    "div.message.message--error.message--icon.u-mb-xs"
  );

  constructor(private page: Page, private domain: Domain) {
    this.page = page;
    this.domain = domain;
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submitLoginForm(): Promise<void> {
    await this.suibmitLoginButton.click();
  }
}
