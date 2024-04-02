import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
	await context.addInitScript(() => {
		// @ts-ignore
		window.isUnderTest = true;
	})
})

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Simple Multiplayer Reaction Game' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
});

test('Closing help dialog reveals home screen', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Close' }).click();
	await expect(page.getByRole('link', { name: 'Host a New Game' })).toBeVisible();
});

test('Host a New Game joins a new room', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Close' }).click();
	await page.getByRole('link', { name: 'Host a New Game' }).click();
	await page.waitForTimeout(2000);
	await expect(page.getByTestId('waiting')).toBeVisible();
});

test('Play a Solo Game', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Close' }).click();
	await page.getByRole('link', { name: 'Host a New Game' }).click();
	await page.waitForTimeout(2000);

	await page.getByRole('button', { name: 'Start Game' }).click();
	await page.waitForTimeout(4000);

	const buttons = await page.getByRole('button').all();
	const count = buttons.length;
	const buttonTextArray = Array.from({ length: count }).fill(0).map((_, i) => `${i + 1}`)
	for await (const name of buttonTextArray) {
		await page.getByRole('button', { name, exact: true }).click();
		await page.waitForTimeout(100);
	}
	await page.waitForTimeout(1000);

	await expect(page.getByTestId('results')).toBeVisible();
});