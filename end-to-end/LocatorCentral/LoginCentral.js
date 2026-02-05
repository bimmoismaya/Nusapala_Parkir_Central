import { expect, test } from "@playwright/test";

export class LoginCentral {
    constructor(page) {
        this.page = page;
        this.url = 'https://parking.abarobotics.com/login';
        this.usernameInput=page.locator('[name="username"]');
        this.passwordInput=page.locator('[name="password"]');
        this.buttonLogin=page.getByRole('button');
        this.expectPage='https://parking.abarobotics.com/admin/dashboard';
        this.expectFooter=page.getByText('Powered by Abarobotics', { exact: true })
    }

    async gotoCentralWeb(){
        await this.page.goto(this.url, {timeout:100000});
    }

    async inputUserInfo(username,password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.buttonLogin.click();
    }

    async expectDashboard(){
        await expect(this.page).toHaveURL(this.expectPage);
        await expect(this.expectFooter).toBeVisible();
    }

}