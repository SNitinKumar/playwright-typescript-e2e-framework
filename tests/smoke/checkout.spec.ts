import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { loginData } from '../../test-data/loginData';
import { checkoutData } from '../../test-data/checkoutData';

test.describe('Checkout - Smoke Tests', () => {
    test('should complete an order successfully @smoke', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.openCart();

        await cartPage.expectCartPage();
        await cartPage.proceedToCheckout();

        await checkoutPage.expectCheckoutInformationPage();

        await checkoutPage.fillCustomerInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.expectCheckoutOverviewPage();

        await expect(page.locator('.inventory_item_name')).toHaveText(
            'Sauce Labs Backpack'
        );

        await checkoutPage.finishOrder();
        await checkoutPage.expectOrderCompleted();
    });
});