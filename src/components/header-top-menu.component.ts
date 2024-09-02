import { Domain } from "@models/domain.type";
import { Page } from "@playwright/test";
import { LoginFormComponent } from "./login-form.component";

export class HeaderTopMenuComponent {
  loginButton = this.page.getByTestId("header-user-box-toggle-button");

  constructor(private page: Page, private domain: Domain) {
    this.page = page;
    this.domain = domain;
  }

  async clickLoginButton(): Promise<LoginFormComponent> {
    await this.loginButton.click();
    return new LoginFormComponent(this.page, this.domain);
  }
}
