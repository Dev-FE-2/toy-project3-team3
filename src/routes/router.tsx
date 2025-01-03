import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import {
  AlertPage,
  HomePage,
  MyCommentPage,
  MyFollowingPage,
  MyLikePage,
  MySubscribePage,
  PlayListEditPage,
  PlayListPage,
  SearchPage,
  SignInPage,
  SignUpPage,
  MyInfoEditPage,
  UserFollowPage,
  UserPage,
} from '@/pages';
import { ROUTES } from '@/constants';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

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
  SEARCH,
  SIGN_IN,
  SIGN_UP,
  USER_FOLLOW,
  USER,
  NOT_FOUND,
} = ROUTES;

const router = createBrowserRouter([
  { path: SIGN_IN, element: <SignInPage /> },
  { path: SIGN_UP, element: <SignUpPage /> },
  {
    element: <Layout />,
    children: [
      { path: HOME, element: <HomePage /> },
      { path: ALERT, element: <AlertPage /> },
      { path: MY_COMMENT, element: <MyCommentPage /> },
      { path: MY_FOLLOWING, element: <MyFollowingPage /> },
      { path: MY_LIKE, element: <MyLikePage /> },
      { path: MY_SUBSCRIBE, element: <MySubscribePage /> },
      { path: MY_INFO_EDIT, element: <MyInfoEditPage /> },
      { path: PLAY_LIST_EDIT, element: <PlayListEditPage /> },
      { path: PLAY_LIST, element: <PlayListPage /> },
      { path: SEARCH, element: <SearchPage /> },
      { path: USER_FOLLOW, element: <UserFollowPage /> },
      { path: USER, element: <UserPage /> },
      { path: NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);

export default router;
