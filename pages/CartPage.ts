import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', {
            name: 'Continue Shopping',
        });
    }

    getCartItem(productName: string): Locator {
        return this.page.locator('.cart_item').filter({
            hasText: productName,
        });
    }

    async expectCartPage(): Promise<void> {
        await expect(this.pageTitle).toHaveText('Your Cart');
    }

    async expectProductInCart(productName: string): Promise<void> {
        await expect(this.getCartItem(productName)).toBeVisible();
    }

    async removeProduct(productName: string): Promise<void> {
        const product = this.getCartItem(productName);

        await product.getByRole('button', { name: /remove/i }).click();
    }

    async expectProductNotInCart(productName: string): Promise<void> {
        await expect(this.getCartItem(productName)).toHaveCount(0);
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}