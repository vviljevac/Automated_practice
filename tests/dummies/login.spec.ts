import { test, expect } from '@playwright/test';
import { VariablesLogin } from './utils-login';

let v;
//Before each test, go to page
test.beforeEach(async ({ page }) => {

    await page.goto('https://dummies-profileapi.dummies.com/v2/sso/login');
    v = new VariablesLogin(page);
});

test('01-Verify the title', async ({ page }) => {
    await expect(page).toHaveTitle('Wiley | User Log in');
});

test('02-Verify the header', async ({ }) => {
    expect(v.h1Element).not.toBeNull();
    expect(await v.h1Element.innerText()).toContain('Welcome Back to Wiley');
});

test('03-Verify the form with "Username/Email" and "Password" fields', async ({ }) => {
    expect(v.inputEmail).not.toBeNull();
    expect(v.inputPassword).not.toBeNull();
});

test('04-Verify the proper validation appears when "Username/Email" and "Password" fields are blank', async ({ }) => {
    //validation not be visible yet.
    expect(await v.validationEmail.isVisible()).toBe(false);
    await v.clickLogin();
    //validation should now be visible.
    expect(await v.validationEmail.isVisible()).toBe(true);
});

test('05-Verify the proper validation appears when "Password" field is blank', async ({ }) => {
    await v.inputUserAndPass('vinkotester@gmail.com', '');
    await v.clickLogin();
    //validation should now be visible.
    expect(await v.validationPassword.isVisible()).toBe(true);

});

test('06-Verify the proper validation when "Username/Email" field is blank', async ({ }) => {
    await v.inputUserAndPass('', 'Password01');
    await v.clickLogin();
    //validation should now be visible.
    expect(await v.validationEmail.isVisible()).toBe(true);
});

test('07-verify the proper validation when email field input is invalid', async () => {
    await test.step('missing @ symbol', async () => {
        await v.inputUserAndPass('vinkotestergmail.com', '');
        await v.clickLogin();
        expect(await v.validationEmail.isVisible()).toBe(true);
    });
    await test.step('missing domain name', async () => {
        await v.inputUserAndPass('vinkotester@', '');
        await v.clickLogin();
        expect(await v.validationEmail.isVisible()).toBe(true);
    });
    await test.step('missing top-level domain', async () => {
        await v.inputUserAndPass('vinkotester@gmail', '');
        await v.clickLogin();
        expect(await v.validationEmail.isVisible()).toBe(true);
    });
    await test.step('multiple @ symbols', async () => {
        v.inputUserAndPass('vinko@tester@gmail.com', '');
        v.clickLogin();
        expect(await v.validationEmail.isVisible()).toBe(true);
    });
    await test.step('missing local part', async () => {
        await v.inputUserAndPass('@gmail.com', '');
        await v.clickLogin();
        expect(await v.validationEmail.isVisible()).toBe(true);
    });
    await test.step('missing @ symbol and domain', async () => {
        await v.inputUserAndPass('vinkotester', '');
        await v.clickLogin();
        expect(await v.validationEmail.isVisible()).toBe(true);
    });
    await test.step('invalid characters', async () => {
        await v.inputUserAndPass('vinkotester@gmail!.com', '');
        await v.clickLogin();
        expect(await v.validationEmail.isVisible()).toBe(true);
    });
});

test('08-Verify the proper validation when password is incorrect', async () => {
    await v.inputUserAndPass('vinkotester@gmail.com', 'incorrect');
    await v.clickLogin();
    expect(await v.incorrectCreds.isVisible()).toBe(true);
});

test('09-Verify the correct "Email" and "Password" field values', async ({ page }) => {
    await v.inputUserAndPass('vinkotester@gmail.com', 'Vinkotester123!');
    await v.clickLogin();
    await expect(page).toHaveURL('https://www.dummies.com/my-account/');
});

test('10-Verify that the "Username/Email" field is case-insensitive', async ({ page }) => {
    await v.inputUserAndPass('VINKOTESTER@GMAIL.COM', 'Vinkotester123!');
    await v.clickLogin();
    expect(await v.validationEmail.isVisible()).toBe(false);
    await expect(page).toHaveURL('https://www.dummies.com/my-account/');
});

test('11-Verify the "Forgot your password?" clickable text navigates to "Forgot your password?" web page', async ({ page }) => {
    await v.clickForgotPassword();
    expect(page.url()).toContain('account.wiley.com/forgotpassword');
});

test('12-Verify the tooltip shows when the circled question mark is hovered', async ({ page }) => {
    expect(await v.visibleQuestionTooltip()).toBeTruthy();
});

test('13-Verify the "Register" button navigates to a registration web page', async ({ page }) => {
    await v.clickLogin();
    expect(page.url()).toContain('https://account.wiley.com/registration');
});