import { combineReducers } from "redux";
import auth from "./Auth/reducers";
import authSaga from "./Auth/saga";
import user from "./User/reducers";
import userSaga from "./User/saga";
import post from "./Post/reducers";
import postSaga from "./Post/saga";
import postlist from "./PostList/reducers";
import postlistSaga from "./PostList/saga";
import loading from "./Loading";
import msg, { msgSaga } from "./Msg";

import { all, fork } from "redux-saga/effects";

export type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer: any = combineReducers<RootStateType>({
  auth,
  user,
  post,
  postlist,
  loading,
  msg
});
export default rootReducer;
export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(postSaga),
    fork(postlistSaga),
    fork(msgSaga)
  ]);
}
