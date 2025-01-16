import { test, expect } from '@playwright/test';

test.describe('로그인 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/sign-in');
  });

  test('유효한 정보로 로그인', async ({ page }) => {
    // 이메일, 비밀번호 입력
    await page.fill('input[id="email"]', 'test2@email.com');
    await page.fill('input[id="password"]', '123456');

    // 로그인 버튼 활성화 확인 및 클릭
    await expect(page.locator('button:nth-of-type(1)')).toBeEnabled(); // 로그인 버튼
    await expect(page.locator('button:nth-of-type(2)')).toBeEnabled(); // Google 계정으로 로그인 버튼
    await page.locator('button:nth-of-type(1)').click();

    // 로그인 성공 후 리다이렉트 확인
    await expect(page).toHaveURL('/');
  });

  test('잘못된 이메일 형식', async ({ page }) => {
    await page.fill('input[id="email"]', 'test2');
    await page.click('input[id="password"]'); // 블러 처리 유도
    await expect(page.getByText('유효한 이메일을 입력해주세요')).toBeVisible();
  });
});
