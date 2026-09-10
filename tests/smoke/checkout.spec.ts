import { test, expect } from '../../fixtures/testFixtures';
import { checkoutData } from '../../test-data/checkoutData';

test.describe('Checkout - Smoke Tests', () => {
    test('should complete an order successfully @smoke', async ({
        page,
        productsPage,
        cartPage,
        checkoutPage,
        loggedInUser,
    }) => {
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