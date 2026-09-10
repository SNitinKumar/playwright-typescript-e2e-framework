import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { loginData } from '../../test-data/loginData';

test.describe('Products and Cart - Smoke Tests', () => {
    test('should add a product to the cart and verify it @smoke', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await loginPage.navigate();
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        await productsPage.expectProductsPage();
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.expectCartItemCount(1);
        await productsPage.openCart();

        await cartPage.expectCartPage();
        await cartPage.expectProductInCart('Sauce Labs Backpack');

        await expect(page).toHaveURL(/cart.html/);
    });
});