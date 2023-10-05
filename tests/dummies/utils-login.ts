import type { Page, Locator, ElementHandle } from '@playwright/test';

export class VariablesLogin {
    private readonly inputEmail: Locator;
    private readonly inputPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly btnRegister: Locator;
    private readonly validationEmail: Locator;
    private readonly validationPassword: Locator;
    private readonly incorrectCreds: Locator;
    private readonly forgotPassword: Locator;
    private readonly h1Element: Locator;
    private readonly questionCircle: Locator;
    private readonly tooltipContent: Locator;

    constructor(public readonly page: Page) {
        this.inputEmail = this.page.locator('input[name="username"]');
        this.inputPassword = this.page.locator('input[name="password"]');
        this.btnLogin = this.page.locator('button[id="login-button-default"]');
        this.btnRegister = this.page.locator('button[id="lg-pg-register-button"]');
        this.validationEmail = this.page.locator('[class="invalid-feedback"]', { hasText: 'Please provide a valid email address.' });
        this.validationPassword = this.page.locator('[class="invalid-feedback"]', { hasText: 'Password cannot be empty.' });
        this.incorrectCreds = this.page.locator('[class="kc-feedback-text"]');
        this.forgotPassword = this.page.locator('a[id="forget-password-link"]');
        this.h1Element = page.locator('h1#lg-pg-right-header-text');
        this.questionCircle = page.locator('i[class="bi bi-question-circle"]');
        this.tooltipContent = this.page.locator('[data-bs-toggle="tooltip"]');
    }

    async inputUserAndPass(email: string, password: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
    }

    async clickLogin() {
        await this.btnLogin.click();
    }
    async clickRegister() {
        await this.btnRegister.click();
    }
    async clickForgotPassword() {
        await this.forgotPassword.click();
    }
    async visibleQuestionTooltip() {
        await this.questionCircle.hover();
        return await this.tooltipContent.isVisible();
    }
}