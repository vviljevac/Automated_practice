import type { Page, Locator, ElementHandle } from '@playwright/test';

export class VariablesRegister {
    private readonly inputEmail: Locator;
    private readonly inputPassword: Locator;
    private readonly inputTitle: Locator;
    private readonly inputFirstname: Locator;
    private readonly inputLastname: Locator;
    private readonly inputPhone: Locator;
    private readonly selectCountry: Locator;
    private readonly inputCaptcha: Locator;
    private readonly btnReloadCaptcha: Locator;
    private readonly btnRegister: Locator;
    private questionCircle: Locator;
    private readonly infoCircle: Locator;
    private questionTooltipContent: Locator;
    private infoTooltipContent: Locator;
    private readonly consentCheckBox: Locator;
    private readonly consentCheckBoxLabel: Locator;



    constructor(public readonly page: Page) {
        this.inputEmail = this.page.locator('input[name="rginputemail"]');
        this.inputPassword = this.page.locator('input[name="rginputpassword"]');
        this.inputTitle = this.page.locator('input[name="rginputtitle"]');
        this.inputFirstname = this.page.locator('input[name="rginputfirstname"]');
        this.inputLastname = this.page.locator('input[name="rginputlastname"]');
        this.inputPhone = this.page.locator('input[name="rginputphone"]');
        this.selectCountry = this.page.locator('select[id="rgselectcountry"]');
        this.inputCaptcha = this.page.locator('input[name="rginputcaptch"]');
        this.btnReloadCaptcha = this.page.locator('button[id="reloadcaptch"]');
        this.btnRegister = this.page.locator('button[id="rgbtnregister"]');
        this.questionCircle = this.page.locator('i[class="bi bi-question-circle"]');
        this.infoCircle = page.locator('i[class="bi bi-info-circle"]');
        this.consentCheckBox = page.locator('[id="rgcheckboxtermsandconditions"]');
        this.consentCheckBoxLabel = page.locator('[class="checkbox-label"]');
    }

    async inputUserInformation(email: string, password: string, title: string, firstname: string, lastname: string, country: string, phone: string, captcha: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.inputTitle.fill(title);
        await this.inputFirstname.fill(firstname);
        await this.inputLastname.fill(lastname);
        await this.selectCountry.selectOption(country);
        await this.inputPhone.fill(phone);
        await this.inputCaptcha.fill(captcha);
    }
    async clickCheckBox() {
        await this.consentCheckBox.click();
    }
    async clickCheckBoxLabel() {
        await this.consentCheckBoxLabel.click();
    }

    async visibleInfoTooltip() {
        await this.infoCircle.hover();
        this.infoTooltipContent = this.page.getByRole('tooltip');
        return await this.infoTooltipContent.isVisible();
    }
    async visibleQuestionTooltip() {
        await this.questionCircle.hover();
        this.questionTooltipContent = this.page.getByRole('tooltip');
        return await this.questionTooltipContent.isVisible();
    }
    async clickRegister() {
        await this.btnRegister.click();
    }
}