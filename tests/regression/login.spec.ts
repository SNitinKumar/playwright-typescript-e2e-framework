import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../test-data/loginData';

test.describe('Login - Regression Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('should display an error for a locked-out user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            loginData.lockedUser.username,
            loginData.lockedUser.password
        );

        await loginPage.expectLoginError(
            'Epic sadface: Sorry, this user has been locked out.'
        );
    });

    test('should display an error for invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            loginData.invalidUser.username,
            loginData.invalidUser.password
        );

        await loginPage.expectLoginError(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('should require a username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            loginData.emptyUsername.username,
            loginData.emptyUsername.password
        );

        await loginPage.expectLoginError('Epic sadface: Username is required');
    });

    test('should require a password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            loginData.emptyPassword.username,
            loginData.emptyPassword.password
        );

        await loginPage.expectLoginError('Epic sadface: Password is required');
    });
});