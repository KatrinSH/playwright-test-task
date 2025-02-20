import { test, expect } from '@playwright/test';
import { FormPage } from '../../pages/FormPage';

test.describe('Form Tests', () => {
    
    test('Successful form submission and confirmation screen', async ({ page }) => {
        const formPage = new FormPage(page);
        await formPage.navigate();

        const testData = {
            username: 'TestName',
            password: 'TestPassword',
            gender: 'female' as 'female',
            hobbies: ['reading','sports','music'],
            time: 'Morning'
        };

        await formPage.fillForm(testData.username, testData.password, testData.gender, testData.hobbies, testData.time);
        await formPage.submitForm();

        await formPage.verifyConfirmation(testData.username, testData.gender, testData.hobbies, testData.time);
    });
    test('Successful form submission and confirmation screen with one hobbie', async ({ page }) => {
        const formPage = new FormPage(page);
        await formPage.navigate();

        const testData = {
            username: 'TestName',
            password: 'TestPassword',
            gender: 'female' as 'female',
            hobbies: ['sports'],
            time: 'Morning'
        };

        await formPage.fillForm(testData.username, testData.password, testData.gender, testData.hobbies, testData.time);
        await formPage.submitForm();

        await formPage.verifyConfirmation(testData.username, testData.gender, testData.hobbies, testData.time);
    });

    test('Form should show error on empty fields', async ({ page }) => {
        const formPage = new FormPage(page);
        await formPage.navigate();
        await formPage.submitForm();

        await formPage.validateFieldError('username');
    });

    test('Form should show error on empty password field', async ({ page }) => {
        const formPage = new FormPage(page);
        await formPage.navigate();

        const testData = {
            username: 'TestName',
            password: '',
            gender: 'female' as 'female',
            hobbies: ['music'],
            time: 'Evening'
        };

        await formPage.fillForm(testData.username, testData.password, testData.gender, testData.hobbies, testData.time);
        await formPage.submitForm();

        await formPage.validateFieldError('password');
    });

    test('Form should show error on empty gender field', async ({ page }) => {
        const formPage = new FormPage(page);
        await formPage.navigate();

        const testData = {
            username: 'TestName',
            password: 'TestPassword',
            gender: '' as '',
            hobbies: ['sports'],
            time: 'Evening'
        };

        await formPage.fillForm(testData.username, testData.password, testData.gender, testData.hobbies, testData.time);
        await formPage.submitForm();

        await formPage.validateFieldError('gender');
    });

    test('Form should show error on empty time field', async ({ page }) => {
        const formPage = new FormPage(page);
        await formPage.navigate();

        const testData = {
            username: 'TestName',
            password: 'TestPassword',
            gender: 'male' as 'male',
            hobbies: ['reading'],
            time: ''
        };

        await formPage.fillForm(testData.username, testData.password, testData.gender, testData.hobbies, testData.time);
        await formPage.submitForm();

        await formPage.validateFieldError('time');
    });
    
    

});
