// 파이어베이스랑 통신하는 상수(const)
import {firestore} from "../../firebase";
const todo_db = firestore.collection("todo");
// 리덕스 모듈 파일
// Action + initial state + action creator + reducer

//Action(객체) 상태에 변화가 필요할때(가지고있는데이터변경할때) 발생
// URL로 처리하기
const LOAD = 'todo/LOAD';          // 일정을 올린다.
const CREATE = 'todo/CREATE';      // 일정을 기록한다.
const COMPLETE = 'todo/COMPLETE';  // 일정을 완료 처리한다.
const DELETE = 'todo/DELETE';      // 일정을 삭제한다.
const COMPLETELIST = 'todo/COMPLETELIST';


//initialState
const initialState = {
    todos: [
        {
            id: 1,
            year: '2021',
            month: '03',
            day: '21',
            hour: '14',
            minute: '40',
            text: 'React 강의 다 듣기',
            done: true
        }, {
            id: 2,
            year: '2021',
            month: '03',
            day: '14',
            hour: '19',
            minute : '12',
            text: 'WIL 작성',
            done: true
        }, {
            id: 3,
            year: '2021',
            month: '03',
            day: '25',
            hour: '23',
            minute : '45',
            text: '과제 제출 마감',
            done: false
        }, {
            id: 4,
            year: '2021',
            month: '03',
            day: '25',
            hour: '07',
            minute : '12',
            text: '운동하기',
            done: false
        }, {
            id: 5,
            year: '2021',
            month: '03',
            day: '16',
            hour: '17',
            minute : '12',
            text: '수영 2시간',
            done: false
        }
    ]
};

// ActionCreator(함수)
//완료여부를 따지려면 데이터 필요 
// 데이터는 파이어스토어에서 필터하지 말고, 
//리덕스나 컴포넌트에서 필터 나중에 여기에 추가하거나 컴포넌트 바꾸기
// 추후 파이어베이스를 하게 되면 미들웨어 추가.

export const loadTodo = (todo) => {
    return {type:LOAD, todo};

}
export const createTodo = (todo) => {
    return {type:CREATE, todo}
}

export const completeTodo = (id) => {
    return {type: COMPLETE, id}
}

export const deleteTodo = (id) => {
    return {type: DELETE, id}
}

export const completeList = () => {
    return {type: COMPLETELIST}
}

// firebase랑 통신하는 함수
// middleware = redux-thunk
// 액션을 객체가 아닌 함수로 생성하는 액션생성함수(actionCreator)를 작성하게 해준다. 
// 함수면 특정 액션 전에 조건을 주거나 행동 사전처리 가능.
// 미들웨어로 액션을 객체가 아닌 함수로 반환
    // getState = 모듈 store 값

export const loadTodoFB = () => {
    return function(dispatch) {   // function이란 함수로 반환.dispatch는 데이터 가져올 때 쓰는 매개변수
        
        todo_db.get().then((docs) => {
            let todo_data = [];

            docs.forEach((doc) => {
                if(doc.exists){
                    todo_data = [...todo_data, {id: doc.id, ...doc.data()}];
                }
            });
            
            console.log(todo_data)
            dispatch(loadTodo(todo_data));
            });
        }
    }

export const createTodoFB = (todo) => {
    
    return function (dispatch) {
        let todo_item = {
            year: todo.year,
            month: todo.month,
            day: todo.day,
            hour: todo.hour,
            minute: todo.minute,
            text: todo.text,
            done: todo.done,
        };

        todo_db.add(todo_item).then(docRef => {    // 파이어스토어 변화가 완료된 자료 = docRef

            todo_item = {...todo_item, id:docRef.id};
            dispatch(createTodo(todo_item));
        });
    };
};

export const completeTodoFB = (id) => {
    // const _todo_item = getState().todo.todos.filter((baseTodo) => {

    //     if(baseTodo.id === id) {
    //         return baseTodo
    //     }
    // })
    // 윗 부분은 return function(dispatch, getState) { ... 이런식이 되어야 한다.
    return function(dispatch) {
        todo_db.doc(id).update({done: true}).then(() => {
            dispatch(completeTodo());
            window.location.replace("/");
        }).catch(err => {
            console.log(err)
        });
    };
};

export const deleteTodoFB = (id) => {
    return function(dispatch, getState) {
        const _todo_item = getState().todo.todos.find((todo) => todo.id === id)

        if (!_todo_item) {
            return;
        }

        todo_db.doc(_todo_item.id).delete().then(docRef => {
            dispatch(deleteTodo(id));
            window.location.replace("/");
        }).catch(error => {
            console.log(error);
        });
    };
}



// Reducer 
//리덕스에 저장된 상태(데이터)를 변경하는 함수
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            if (action.todo.length > 0) {
                return {todos:action.todo}
            }
            return state;

        case CREATE: {
            // action.todo.id = state.todos[state.todos.length-1].id + 1;
            // const newTodos = [...state.todos, action.todo];
            // console.log(newTodos)
            const newTodos = [...state.todos, action.todo]

            return {todos:newTodos}
            // return {...state, todos: newTodos};
        }

        case COMPLETE: {
            const updateDone = state.todos.map((todo) => {
                if(todo.id === action.id) {
                    return {...todo, done:true}
                } else {
                    return todo;
                }
            });
            return {todos: updateDone};
            // break;
        }    

        case DELETE: {
            const todoList = state.todos.filter((todo, idx) => { // idx : 인덱스로 삭제를 한다.

                if(todo.idx !== action.idx){   // 인덱스가 다른 것만 가져온다.
                // if( todo.idx !== action.id){   
                // if( idx !== action.todo){    
                    return todo;  // todo = true 같은 것
                // }else {
                //     return todo
                }
            });

            return {todos : todoList};
        }

        case COMPLETELIST: {
            const completeList = state.todos.filter((todo) => {
                if (todo.id === action.id) {
                    return todo
                }
            });
            // console.log(completeList)
            // console.log(todo)
            return {todos: completeList}
        }

        default:
            return state;
            //기본값으로 보내줘야 한다.
    }
};