import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productSortDropdown: Locator;
    readonly cartLink: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    async expectProductsPage(): Promise<void> {
        await expect(this.pageTitle).toHaveText('Products');
    }

    async sortProductsByPriceLowToHigh(): Promise<void> {
        await this.productSortDropdown.selectOption('lohi');
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = this.page.locator('.inventory_item').filter({
            hasText: productName,
        });

        await product.getByRole('button', { name: /add to cart/i }).click();
    }

    async expectCartItemCount(count: number): Promise<void> {
        await expect(this.shoppingCartBadge).toHaveText(String(count));
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}