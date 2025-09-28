import { test, expect } from "@playwright/test";

const publicPaths = [
  "/",
  "/solutions",
  "/solutions/meta-suite",
  "/solutions/listing-portal",
  "/solutions/reality-designer",
  "/solutions/whatsmap",
  "/marketplace",
  "/pricing",
  "/academy",
  "/community",
];

test("home renders and has Solutions link", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/Solutions/i)).toBeVisible();
});

test("public pages respond", async ({ page }) => {
  for (const path of publicPaths) {
    await page.goto(path);
    await expect(page).toHaveURL(new RegExp(path.replace(/\//g, "\\/")));
  }
});
