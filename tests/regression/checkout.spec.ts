import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { loginData } from '../../test-data/loginData';
import { checkoutData } from '../../test-data/checkoutData';

test.describe('Checkout - Regression Tests', () => {
    test.beforeEach(async ({ page }) => {
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
        await cartPage.proceedToCheckout();
        await checkoutPage.expectCheckoutInformationPage();
    });

    test('should display an error when checkout information is empty @regression', async ({
        page,
    }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.continueToOverview();

        await checkoutPage.expectCheckoutError('Error: First Name is required');
    });

    test('should complete checkout with valid customer information @regression', async ({
        page,
    }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillCustomerInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode
        );

        await checkoutPage.continueToOverview();
        await checkoutPage.expectCheckoutOverviewPage();
        await checkoutPage.finishOrder();
        await checkoutPage.expectOrderCompleted();
    });
});