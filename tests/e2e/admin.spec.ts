import { test, expect } from "@playwright/test";

const adminCookie = { name: "demo-user", value: "admin", path: "/", domain: "localhost" };

const adminPaths = ["/admin", "/admin/plans", "/admin/orders", "/admin/agents"];

test.beforeEach(async ({ context }) => {
  await context.addCookies([adminCookie]);
});

test("admin pages accessible with cookie", async ({ page }) => {
  for (const path of adminPaths) {
    await page.goto(path);
    await expect(page).toHaveURL(new RegExp(path.replace(/\//g, "\\/")));
  }
});
