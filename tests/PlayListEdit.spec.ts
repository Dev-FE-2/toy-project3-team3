import { test, expect } from '@playwright/test';

test.describe('플레이리스트 수정 페이지', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 후 진행
    await page.goto('/auth/sign-in');

    await page.fill('input[id="email"]', 'test2@email.com');
    await page.fill('input[id="password"]', '123456');

    await page.locator('button:nth-of-type(1)').click();

    await expect(page).toHaveURL('/');
    await page.goto('/playlist/01621bdf-3629-4be3-890a-1b8a2ed262fa/edit');
  });

  test('플레이리스트 정보 수정', async ({ page }) => {
    await page.fill('input[id="title"]', '새로운 플레이리스트 제목');
    await page.fill('input[id="description"]', '새로운 소개입니다.');

    for (let i = 0; i < 11; i++) {
      await page.fill('input[id="hashtag"]', `해시태그_${i}`);
      await page.getByRole('button', { name: '추가' }).click();
    }
    await expect(
      page.getByText('해시태그는 10개까지만 추가 가능합니다.'),
    ).toBeVisible();
  });
});
