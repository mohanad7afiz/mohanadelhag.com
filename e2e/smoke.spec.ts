import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Mohanad/i);
    await expect(page.locator("nav")).toBeVisible();
  });

  test("blog listing renders posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText("Writing");
    const posts = page.locator(".blog-post-item");
    await expect(posts.first()).toBeVisible();
  });

  test("blog post page renders content", async ({ page }) => {
    await page.goto("/blog/building-modern-web-apps");
    await expect(page.locator("h1")).toContainText(
      "Building Modern Web Applications"
    );
    await expect(page.locator("article.prose")).toBeVisible();
    await expect(page.locator(".tag").first()).toBeVisible();
  });

  test("404 page works", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /read the blog/i }).click();
    await expect(page).toHaveURL(/\/blog/);
  });
});
