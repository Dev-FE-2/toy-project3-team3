import { test, expect, chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('구글 로그인', () => {
  test.beforeEach(async () => {
    // 로그인 후 세션 상태를 저장
    const browser = await chromium.launch({
      args: [
        '--disable-blink-features=AutomationControlled', // 자동화 감지 비활성화
        '--disable-features=PasswordManager', // 패스키 관련 설정 우회
      ],
    });

    const context = await browser.newContext();
    const newPage = await context.newPage();
    await newPage.goto('https://accounts.google.com/signin');

    // 로그인 절차 건너뛰기
    await newPage.fill(
      'input[type="email"]',
      process.env.GOOGLE_USER as string,
    );
    await newPage.click('button:has-text("Next")');
    await newPage.fill(
      'input[type="password"]',
      process.env.GOOGLE_PWD as string,
    );
    await newPage.click('button:has-text("Next")');

    // 세션 상태 저장
    await context.storageState({ path: 'google-login-state.json' });

    await browser.close();
  });

  test('구글 로그인 후 리다이렉션 확인', async () => {
    const browser = await chromium.launch({
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-features=PasswordManager',
      ],
    });
    const context = await browser.newContext({
      storageState: 'google-login-state.json', // 로그인 상태 재사용
    });
    const newPage = await context.newPage();

    await newPage.goto('/');
    await expect(newPage).toHaveURL('/');
    await browser.close();
  });
});
