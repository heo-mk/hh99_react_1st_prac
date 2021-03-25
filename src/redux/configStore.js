// 리덕스 패키지
// redux 파일 : 리덕스 액션, 초기 상태, 액션 크리에이터, 미들웨어, 리듀서 
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";    // 객체 대신 함수를 생성하는 액션 생성함수를 작성하게 해준다
import todo from "./modules/todo";  // 리덕스 모듈 가져온다.

// history 가져오기 - history는 아마 라우터할때 가져오는 것.
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

// 추후 파이어베이스 활성화되면 쓸 부분
const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

// 리듀서 모으기. 여기서는 하나만 있다.
const rootReducer = combineReducers({ todo });
// store 역할 설정.
const store = createStore(rootReducer, enhancer);

// store 역할
export default store; 