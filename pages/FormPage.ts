import { Page, expect } from '@playwright/test';

export class FormPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get usernameInput() {
        return this.page.getByRole('textbox', { name: 'Username:' });
    }

    private get passwordInput() {
        return this.page.getByRole('textbox', { name: 'Password:' });
    }

    private get genderMaleRadio() {
        return this.page.getByRole('radio', { name: 'Male', exact: true });
    }

    private get genderFemaleRadio() {
        return this.page.getByRole('radio', { name: 'Female' });
    }

    private get hobbiesCheckboxes() {
        return {
            reading: this.page.getByRole('row', { name: 'Reading' }).getByRole('checkbox'),
            sports: this.page.getByRole('row', { name: 'Sports' }).getByRole('checkbox'),
            music: this.page.getByRole('row', { name: 'Music' }).getByRole('checkbox')
        };
    }

    private get timeDropdown() {
        return this.page.locator('select[name="time"]');
    }

    private get submitButton() {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    private get confirmationHeading() {
        return this.page.getByRole('heading', { name: /^Greetings,/ });
    }

    private get genderResult() {
        return this.page.getByRole('cell', { name: /Female|Male/ });
    }

    private get hobbiesResult() {
        return this.page.getByRole('cell', { name: /Reading|Sports|Music/ });
    }

    private get timeResult() {
        return this.page.getByRole('cell', { name: /Morning|Noon|Evening/ });
    }

    async navigate(): Promise<void> {
        await this.page.goto('http://localhost:3000');
    }

    async fillForm(username: string, password: string, gender: 'male' | 'female' | '', hobbies: string[], time: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        if (gender === 'male') {
            await this.genderMaleRadio.check();
        } else if (gender === 'female') {
            await this.genderFemaleRadio.check();
        }

        for (const hobby of hobbies) {
            if  (this.hobbiesCheckboxes[hobby]) {
                await this.hobbiesCheckboxes[hobby].check();
            }
        }

        await this.timeDropdown.selectOption(time);
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    async verifyConfirmation(username: string, gender: 'male' | 'female', hobbies: string[], time: string): Promise<void> {
        await expect(this.confirmationHeading).toBeVisible();
        await expect(this.confirmationHeading).toContainText(`Greetings, ${username}`);

        await expect(this.genderResult).toHaveText(gender === 'male' ? 'Male' : 'Female');
        
        for (const hobby of hobbies) {
            await expect(this.hobbiesResult).toContainText(new RegExp(hobby, 'i'));
        }

        await expect(this.timeResult).toHaveText(time);
    }

    async validateFieldError(selector: 'username' | 'password' | 'gender' | 'time'): Promise<void> {
        let validationMessage: string;

        switch (selector) {
            case 'username':
                validationMessage = await this.usernameInput.evaluate(input => (input as HTMLInputElement).validationMessage);
                break;
            case 'password':
                validationMessage = await this.passwordInput.evaluate(input => (input as HTMLInputElement).validationMessage);
                break;
            case 'gender':
                validationMessage = await this.genderMaleRadio.evaluate(input => (input as HTMLInputElement).validationMessage);
                break;
            case 'time':
                validationMessage = await this.timeDropdown.evaluate(input => (input as HTMLInputElement).validationMessage);
                break;
            default:
                throw new Error(`Unknown selector: ${selector}`);
        }

        expect(validationMessage).not.toBe('');
    }
}
