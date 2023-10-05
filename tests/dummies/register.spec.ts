import { test, expect } from '@playwright/test';
import { VariablesRegister } from './utils-register';

let v;
//Before each test, go to page
test.beforeEach(async ({ page }) => {

    await page.goto('https://dummies-profileapi.dummies.com/v2/sso/login');
    const regBtn = page.locator('button[id="lg-pg-register-button"]');
    await regBtn.click();
    v = new VariablesRegister(page);
});

test('01-Verify the title', async ({ page }) => {
    await expect(page).toHaveTitle('Wiley | New User Registration');
});
test('02-Verify the tooltip shows when the info mark above the "Email" field is hovered', async ({ page }) => {
    expect(await v.visibleInfoTooltip()).toBeTruthy();
});
test('03-Verify the tooltip shows when the info mark above the "Password" field is hovered', async ({ page }) => {
    expect(await v.visibleQuestionTooltip()).toBeTruthy();
});

test('04-Verify the "Register" button is disabled when All Fields Are Blank', async () => {
    await v.inputUserInformation('', '', '', '', '', '', '', '');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).toBeDisabled();
});

test('05-Verify the "Register" button is disabled when Email Is Blank', async () => {
    await v.inputUserInformation('', 'L963XF*.$prxr@@', 'Sir', 'Vinko', 'Tester', 'HR', '0912345678', 'c4pTcHa');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).toBeDisabled();

});

test('06-Verify the "Register" button is disabled when Password Is Blank', async () => {
    await v.inputUserInformation('vinkotester@gmail.com', '', 'Sir', 'Vinko', 'Tester', 'HR', '0912345678', 'c4pTcHa');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).toBeDisabled();
});

test('07-Verify the "Register" button is disabled when Title Is Optional (Not Provided)', async () => {
    await v.inputUserInformation('vinkotester@gmail.com', 'L963XF*.$prxr@@', '', 'Vinko', 'Tester', 'HR', '0912345678', 'c4pTcHa');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).not.toBeDisabled();
});

test('08-Verify the "Register" button is disabled when First Name Is Blank', async () => {
    await v.inputUserInformation('vinkotester@gmail.com', 'L963XF*.$prxr@@', 'Sir', '', 'Tester', 'HR', '0912345678', 'c4pTcHa');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).toBeDisabled();
});

test('09-Verify the "Register" button is disabled when Last Name Is Blank', async () => {
    await v.inputUserInformation('vinkotester@gmail.com', 'L963XF*.$prxr@@', 'Sir', 'Vinko', '', 'HR', '0912345678', 'c4pTcHa');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).toBeDisabled();
});

test('10-Verify the "Register" button is disabled when Country Is Not Selected', async () => {
    await v.inputUserInformation('vinkotester@gmail.com', 'L963XF*.$prxr@@', 'Sir', 'Vinko', 'Tester', '', '0912345678', 'c4pTcHa');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).toBeDisabled();
});

test('11-Verify the "Register" button is disabled when Phone Number Is Optional (Not Provided)', async () => {
    await v.inputUserInformation('vinkotester@gmail.com', 'L963XF*.$prxr@@', 'Sir', 'Vinko', 'Tester', 'HR', '', 'c4pTcHa');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).not.toBeDisabled();
});

test('12-Verify the "Register" button is disabled when Captcha Is Blank', async () => {
    await v.inputUserInformation('vinkotester@gmail.com', 'L963XF*.$prxr@@', 'Sir', 'Vinko', 'Tester', 'HR', '0912345678', '');
    await v.consentCheckBox.check();
    await expect(v.btnRegister).toBeDisabled();
});
test('13-Verify the "Register" button is disabled when Consent Check Box Is Not Checked', async () => {
    await v.consentCheckBox.uncheck();
    await v.inputUserInformation('vinkotester@gmail.com', 'L963XF*.$prxr@@', 'Sir', 'Vinko', 'Tester', 'HR', '0912345678', '');
    await expect(v.btnRegister).toBeDisabled();
});