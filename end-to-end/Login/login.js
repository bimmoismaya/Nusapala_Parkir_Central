import { expect, test } from "@playwright/test";

export class LoginNP{
    constructor(page){
        this.page=page;
        this.url= 'https://ho-staging.nusapalaparking.com/';
        this.usernameInput= page.locator('[name="username"]');
        this.passwordInput= page.locator('[name="password"]');
        this.buttonLogin= page.getByRole('button');
        this.expectPage='https://ho-staging.nusapalaparking.com/admin/dashboard';
        this.expectFooter= page.getByText('Powered by Abarobotics', { exact: true });
    }

    async gotoWebsite(){
        await this.page.goto(this.url, {TIMEOUT: 100000});
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