import { test, expect } from "@playwright/test";

const tools = [
  { path: "/workspace/tools/meta-audit", selector: { placeholder: "e.g. 123456789", value: "123456" }, submit: /Run Audit/i, verify: /Meta account audit completed/i },
  { path: "/workspace/tools/listing-health", selector: { placeholder: "Listing ID", value: "DXB-123" }, submit: /Check/i, verify: /Listing checks/i },
  { path: "/workspace/tools/price-estimator", selector: { placeholder: "Community \/ Address", value: "JVC" }, submit: /Estimate/i, verify: /Estimated price range/i },
  { path: "/workspace/tools/brochure-rebrand", selector: { placeholder: "Project Name", value: "Sunrise" }, submit: /Generate/i, verify: /Brochure rebrand generated/i },
];

const activatedCookie = { name: "activated", value: "1", path: "/", domain: "localhost" };

test.beforeEach(async ({ context }) => {
  await context.addCookies([activatedCookie]);
});

test("workspace shell loads", async ({ page }) => {
  await page.goto("/workspace");
  await expect(page.getByText(/Welcome back/i)).toBeVisible();
});

test("workspace tools submit successfully", async ({ page }) => {
  for (const tool of tools) {
    await page.goto(tool.path);
    if (tool.selector.label) {
      await page.getByLabel(tool.selector.label).fill(tool.selector.value);
    }
    if (tool.selector.placeholder) {
      await page.getByPlaceholder(tool.selector.placeholder).fill(tool.selector.value);
    }
    await page.getByRole("button", { name: tool.submit }).click();
    const confirmation = page.getByText(tool.verify).first();
    await expect(confirmation).toBeVisible({ timeout: 5000 });
  }
});
