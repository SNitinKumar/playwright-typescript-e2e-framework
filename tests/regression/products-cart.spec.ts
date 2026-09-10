import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { loginData } from '../../test-data/loginData';

test.describe('Products and Cart - Regression Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );
    });

    test('should sort products by price from low to high @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.expectProductsPage();
        await productsPage.sortProductsByPriceLowToHigh();

        await productsPage.expectProductsPage();
    });

    test('should add multiple products to the cart @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.addProductToCart('Sauce Labs Bike Light');
        await productsPage.expectCartItemCount(2);
        await productsPage.openCart();

        await cartPage.expectCartPage();
        await cartPage.expectProductInCart('Sauce Labs Backpack');
        await cartPage.expectProductInCart('Sauce Labs Bike Light');
    });

    test('should remove a product from the cart @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.openCart();

        await cartPage.expectProductInCart('Sauce Labs Backpack');
        await cartPage.removeProduct('Sauce Labs Backpack');
        await cartPage.expectProductNotInCart('Sauce Labs Backpack');
    });
});