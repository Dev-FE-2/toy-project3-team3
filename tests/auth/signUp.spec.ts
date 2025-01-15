import { test, expect } from '@playwright/test';

test.describe('회원가입 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/sign-up');
  });

  test('유효한 정보로 회원가입', async ({ page }) => {
    // 닉네임 입력 및 중복체크
    await page.fill('input[id="nickname"]', '테스트닉네임2');
    await page.getByRole('button', { name: '중복 확인' }).first().click();
    await expect(page.getByText('사용 가능한 닉네임입니다')).toBeVisible();

    // 이메일 입력 및 중복체크
    await page.fill('input[id="email"]', 'test2@email.com');
    await page.getByRole('button', { name: '중복 확인' }).nth(1).click();
    await expect(page.getByText('사용 가능한 이메일입니다')).toBeVisible();

    // 비밀번호 입력
    await page.fill('input[id="password"]', '123456');
    await page.fill('input[id="confirmPassword"]', '123456');

    // 가입하기 버튼 활성화 확인 및 클릭
    await expect(page.getByRole('button', { name: '가입하기' })).toBeEnabled();
    await page.getByRole('button', { name: '가입하기' }).click();
  });

  test('중복된 닉네임 체크', async ({ page }) => {
    await page.fill('input[id="nickname"]', '테스트닉네임');
    await page.getByRole('button', { name: '중복 확인' }).first().click();
    await expect(page.getByText('이미 사용 중인 닉네임입니다')).toBeVisible();
  });

  test('중복된 이메일 체크', async ({ page }) => {
    await page.fill('input[id="email"]', 'test@email.com');
    await page.getByRole('button', { name: '중복 확인' }).nth(1).click();
    await expect(page.getByText('이미 가입된 이메일입니다')).toBeVisible();
  });

  test('비밀번호 불일치', async ({ page }) => {
    await page.fill('input[id="password"]', '123456');
    await page.fill('input[id="confirmPassword"]', '456789');
    await page.click('input[id="email"]'); // 블러 처리 유도
    await expect(page.getByText('비밀번호가 일치하지 않습니다')).toBeVisible();
  });

  test('로그인 페이지로 이동', async ({ page }) => {
    await page.getByText('회원가입이 되어 있으신가요?').click();
    await expect(page).toHaveURL('/auth/sign-in');
  });
});
