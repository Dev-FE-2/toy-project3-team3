# 요리 주제의 영상 기반 SNS 🍕 GRAM





##  설치 방법

```bash
git clone https://github.com/Dev-FE-2/toy-project3-team3.git

npm install

npm run dev
```

## 📌 주요 기능
### 회원가입 및 로그인 페이지
- 사용자는 이메일/비밀번호 계정 혹은 구글 계정으로 인증할 수 있다.
### 메인 페이지
- 사용자는 좋아요한 플레이리스트를 확인할 수 있다
- 사용자는 구독한 플레이리스트를 확인할 수 있다
- 사용자는 추천 플레이리스트를 확인할 수 있다
- 카테고리로 필터하여 플레이리스트를 확인할 수 있다.
### 유저 페이지
- 사용자가 등록한 플레이리스트를 확인할 수 있다.
- 사용자가 구독한 플레이리스트를 확인할 수 있다.
### 유저의 팔로잉, 팔로워 페이지
- 사용자는 자신이 팔로우하는 사용자를 확인할 수 있다.
- 사용자는 자신을 팔로우하는 사용자를 확인할 수 있다.
- 사용자는 다른 사용자를 팔로우하는 사용자를 확인할 수 있다.
- 사용자는 다른 사용자가 팔로우하는 사용자를 확인할 수 있다.
### 나의 좋아요 페이지
- 사용자는 좋아요한 플레이리스트를 확인할 수 있다.
### 나의 댓글 페이지
- 사용자는 작성한 댓글을 확인할 수 있다.
### 나의 구독 페이지
- 사용자는 구독한 플레이리스트를 확인할 수 있다.
### 나의 팔로잉 페이지
- 팔로잉한 사용자들의 플레이리스트를 확인할 수 있다.
### 나의 알림 페이지
- 사용자는 다른 사용자들로부터 플레이리스트 좋아요와 같은 알림을 받을 수 있다.
### 검색 페이지
- 사용자는 사용자 혹은 플레이리스트를 검색할 수 있다.
### 플레이리스트 페이지
- 사용자는 플레이리스트에 등록된 영상을 시청할 수 있다.
- 사용자는 플레이리스트에 등록되어있는 영상들 중 시청할 영상을 선택할 수 있다.
- 사용자는 플레이리스트에 좋아요할 수 있다.
- 사용자는 플레이리스트를 구독할 수 있다.
- 사용자는 플레이리스트의 해시태그를 클릭하여 해당 해시태그로 검색할 수 있다.
- 사용자는 플레이리스트에 댓글을 남길 수 있다.
- 사용자는 댓글에 대댓글을 남길 수 있다.
- 사용자는 댓글과 대댓글에 좋아요할 수 있다.
### 플레이리스트 등록 및 수정 페이지
- 사용자는 플레이리스트의 썸네일 이미지를 등록하거나 수정할 수 있다.
- 사용자는 플레이리스트의 제목을 등록하거나 수정할 수 있다.
- 사용자는 플레이리스트의 한줄 소개를 등록하거나 수정할 수 있다.
- 사용자는 플레이리스트의 카테고리를 등록하거나 수정할 수 있다.
- 사용자는 플레이리스트의 해시태그를 등록하거나 수정할 수 있다.
- 사용자는 플레이리스트의 영상들을 등록하거나 수정할 수 있다.




## 🔧 기술 스택

### 프론트엔드
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

### 상태관리
<img src="https://img.shields.io/badge/👻%20zotai-gray?style=for-the-badge"/> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"/>

### 백엔드 및 데이터베이스
<img src="https://img.shields.io/badge/Supabase-black?style=for-the-badge&logo=supabase"/>

### 테스트
<img src="https://img.shields.io/badge/Playwright-45BA4B?style=for-the-badge"/>

### 개발 도구

<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint"/> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier"/> <img src="https://img.shields.io/badge/🐶%20Husky-blue?style=for-the-badge"/>

&nbsp;

## 📂 폴더 구조

```
└─ src
 ├── assets
 ├── components/       # 재사용 가능한 공통 컴포넌트
 │   ├── common/
 │	 │   ├── Button/
 │	 │   │   ├── Button.tsx
 │	 │   │   ├── Button.styles.ts
 │	 │   │   └── Button.test.ts
 │	 │   ├── Input/
 │	 │   │   ├── Input.tsx
 │	 │   │   ├── Input.styles.ts
 │	 │   │   └── Input.test.ts
 │	 │   └── index.ts       # 배럴 익스포트 패턴
 │   ├── Home       # 재사용 불가능한 각 페이지에서 사용하는 컴포넌트
 │   │   ├── Home.tsx
 │   │   ├── Home.styles.ts
 │   │   ├── Home.test.ts
 │   │   ├── HomeHeader
 │	 │   │   ├── HomeHeader.tsx
 │	 │   │   ├── HomeHeader.styles.ts
 │	 │   │   └── HomeHeader.test.ts
 │	 │   └── index.ts       # 배럴 익스포트 패턴
 │   ├── Profile
 │   │   ├── Profile.tsx
 │   │   ├── Profile.styles.ts
 │   │   ├── Profile.test.ts
 │	 │   └── index.ts       # 배럴 익스포트 패턴
 ├── hooks/
 │   ├── queries/
 │   │   ├── useFetchUser.ts
 │   │   └── useFetchPlayList.ts
 │   ├── mutations/
 │   │   ├── useSignUp.ts
 │   │   └── useSignIn.ts
 │   ├── useErrorHandler.ts
 │	 └── index.ts       # 배럴 익스포트 패턴
 ├── constants
 ├── pages
 │   ├── HomePage/
 │   │   ├── HomePage.tsx
 │   │   └── HomePage.styles.ts
 │   ├── ProfilePage/
 │   │   ├── ProfilePage.tsx
 │   │   └── ProfilePage.styles.ts
 │   └── index.ts       # 배럴 익스포트 패턴
 ├── services
 ├── utils
 ├── types
 ├── routes
 ├── styles
 ├── App.tsx
 └── main.tsx
```


## Figma
- [Gram Figma](https://www.figma.com/design/gYoLFdjCIp6xXyVedaVAtz/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0-1&p=f&t=6JBaLs85QCbo8OoB-0)

## ERD
<img width="1632" alt="image" src="https://github.com/user-attachments/assets/b8c89b3d-3cb0-41bd-9270-49439e9579bb" />


## 🍔 GRAM의 멤버

| <img width="100px" src="https://avatars.githubusercontent.com/u/175666538?v=4" style="max-width: 100%;"> | <img width="100px" src="https://avatars.githubusercontent.com/u/109134495?v=4" style="max-width: 100%;"> | <img width="100px" src="https://avatars.githubusercontent.com/u/92291790?v=4" style="max-width: 100%;"> | <img width="100px" src="https://avatars.githubusercontent.com/u/156407033?v=4" style="max-width: 100%;"> |
| :-----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
|                                               **이승건**                                                |                                                **최영애**                                                |                                                **김여진**                                                |                                                **오율산**                                                |
|                               [@vgotu99](https://github.com/vgotu99)                                |                                  [@choiyoungae](https://github.com/choiyoungae)                                  |                                 [@duwlsssss](https://github.com/duwlsssss)                                 |                         [@yulsanoh](https://github.com/yulsanoh)                         |
|                                              가보자고! 유형의 개발자                                                  |                                                  즐기며 성장하고 몰두하는 개발자                                                   |                                                  공감능력 최상위 개발자                                                   |                                                  느리지만 꾸준히 노력하는 개발자                                                   |



