import { test, expect } from '../../fixtures/testFixtures';

test.describe('Products and Cart - Smoke Tests', () => {
    test('should add a product to the cart and verify it @smoke', async ({
        productsPage,
        cartPage,
        page,
        loggedInUser,
    }) => {
        await productsPage.expectProductsPage();
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.expectCartItemCount(1);
        await productsPage.openCart();

        await cartPage.expectCartPage();
        await cartPage.expectProductInCart('Sauce Labs Backpack');

        await expect(page).toHaveURL(/cart.html/);
    });
});