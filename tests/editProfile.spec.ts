import { test, expect } from '@playwright/test';

test.describe('프로필 수정 페이지', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 후 진행
    await page.goto('/auth/sign-in');

    await page.fill('input[id="email"]', 'test2@email.com');
    await page.fill('input[id="password"]', '123456');

    await page.locator('button:nth-of-type(1)').click();

    await expect(page).toHaveURL('/');
    await page.goto('/edit');
  });

  test('프로필 정보 수정', async ({ page }) => {
    // 닉네임 변경
    await page.fill('input[id="nickname"]', '새로운닉네임');
    await page.getByRole('button', { name: '중복 확인' }).click();
    await expect(page.getByText('사용 가능한 닉네임입니다')).toBeVisible();

    // 한줄 소개 변경
    await page.fill('input[id="shortIntro"]', '새로운 한줄 소개입니다.');

    // 비밀번호 변경
    await page.fill('input[id="password"]', '123456');
    await page.fill('input[id="confirmPassword"]', '123456');

    // 저장 버튼 클릭
    await expect(page.getByRole('button', { name: '변경 저장' })).toBeEnabled();
    await page.getByRole('button', { name: '변경 저장' }).click();
  });

  test('변경 되돌리기', async ({ page }) => {
    await page.fill('input[id="shortIntro"]', '더 새로운 한줄 소개입니다.');
    await expect(
      page.getByRole('button', { name: '변경 되돌리기' }),
    ).toBeVisible();
    await page.getByRole('button', { name: '변경 되돌리기' }).click();

    // 원래 값으로 복구됐는지 확인
    await expect(page.getByText('한줄소개를 입력해주세요')).toBeVisible();
  });

  test('회원 탈퇴', async ({ page }) => {
    await page.getByRole('button', { name: '회원 탈퇴' }).click();
    await expect(page.getByText('회원 탈퇴 하시겠습니까?')).toBeVisible();

    // 취소
    await page.getByRole('button', { name: '아니오' }).click();
    await expect(page.getByText('회원 탈퇴 하시겠습니까?')).not.toBeVisible();
  });
});
