import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../test-data/loginData';

test.describe('Login - Smoke Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
    });
});