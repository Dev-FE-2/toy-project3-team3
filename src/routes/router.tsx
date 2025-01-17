import { createBrowserRouter } from 'react-router-dom';
import {
  Layout,
  ErrorFallback,
  Auth,
  PlaylistProtectedRoute,
} from '@/components';
import {
  AlertPage,
  HomePage,
  MyCommentPage,
  MyFollowingPage,
  MyLikePage,
  MySubscribePage,
  PlaylistEditPage,
  PlaylistPage,
  SearchPage,
  SignInPage,
  SignUpPage,
  MyInfoEditPage,
  UserFollowPage,
  UserPage,
  NotFoundPage,
} from '@/pages';
import { ROUTES } from '@/constants';

const {
  HOME,
  ALERT,
  MY_COMMENT,
  MY_FOLLOWING,
  MY_LIKE,
  MY_SUBSCRIBE,
  MY_INFO_EDIT,
  PLAY_LIST_EDIT,
  PLAY_LIST,
  PLAY_LIST_ADD,
  SEARCH,
  SIGN_IN,
  SIGN_UP,
  USER_FOLLOW,
  USER,
  AUTH_CALLBACK,
  NOT_FOUND,
} = ROUTES;

const router = createBrowserRouter([
  {
    element: (
      <Auth>
        <Layout />
      </Auth>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { path: SIGN_IN, element: <SignInPage /> },
      { path: SIGN_UP, element: <SignUpPage /> },
      { path: AUTH_CALLBACK, element: <HomePage /> }, // 구글 로그인 콜백
      { path: HOME, element: <HomePage /> },
      { path: SEARCH, element: <SearchPage /> },
      { path: ALERT, element: <AlertPage /> },
      { path: MY_COMMENT, element: <MyCommentPage /> },
      { path: MY_FOLLOWING, element: <MyFollowingPage /> },
      { path: MY_LIKE, element: <MyLikePage /> },
      { path: MY_SUBSCRIBE, element: <MySubscribePage /> },
      { path: MY_INFO_EDIT, element: <MyInfoEditPage /> },
      {
        element: <PlaylistProtectedRoute />,
        children: [
          { path: PLAY_LIST_EDIT, element: <PlaylistEditPage /> },
          { path: PLAY_LIST_ADD, element: <PlaylistEditPage /> },
        ],
      },
      { path: PLAY_LIST, element: <PlaylistPage /> },
      { path: USER_FOLLOW, element: <UserFollowPage /> },
      { path: USER, element: <UserPage /> },
    ],
  },
  { path: NOT_FOUND, element: <NotFoundPage /> },
]);

export default router;
