import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly checkoutTitle: Locator;
    readonly confirmationTitle: Locator;
    readonly confirmationMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });

        this.checkoutTitle = page.locator('.title');
        this.confirmationTitle = page.locator('.complete-header');
        this.confirmationMessage = page.locator('.complete-text');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview(): Promise<void> {
        await this.continueButton.click();
    }

    async finishOrder(): Promise<void> {
        await this.finishButton.click();
    }

    async expectCheckoutInformationPage(): Promise<void> {
        await expect(this.checkoutTitle).toHaveText('Checkout: Your Information');
    }

    async expectCheckoutOverviewPage(): Promise<void> {
        await expect(this.checkoutTitle).toHaveText('Checkout: Overview');
    }

    async expectOrderCompleted(): Promise<void> {
        await expect(this.confirmationTitle).toHaveText('Thank you for your order!');
        await expect(this.confirmationMessage).toContainText(
            'Your order has been dispatched'
        );
    }

    async expectCheckoutError(message: string): Promise<void> {
        await expect(this.errorMessage).toContainText(message);
    }
}