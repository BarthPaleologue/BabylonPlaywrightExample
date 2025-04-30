import { expect, test } from "@playwright/test";

test("The default playground renders correctly", async ({ page }) => {
    await page.goto(`/`);

    await page.locator('#renderCanvas[data-ready="1"]').waitFor({ timeout: 15_000 });

    await expect(page.locator("#renderCanvas")).toHaveScreenshot(`firstFrame.png`, { timeout: 15_000 });
});
