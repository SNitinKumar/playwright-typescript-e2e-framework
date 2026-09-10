import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login - Smoke Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
    });
});