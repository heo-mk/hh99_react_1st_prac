// 부모 컴포넌트 Calendar의 자식 컴포넌트인 Date 컴포넌트
import React from "react"; 
import styled from 'styled-components';
import ListView from './ListView'  // 이 Date 노드의 자식 컴포넌트
import { useDispatch, useSelector } from 'react-redux';  // 리덕스 훅 가져오기
import { loadTodoFB } from './redux/modules/todo';

// Calendar에게서 받은 데이터 : props
const Date = (props) => {
    let day = props.day;
    let notThisMonth = props.notThisMonth;
    let today = props.today;
    let date = props.date.split('.');
    let todoList = useSelector(state => state.todo.todos);  // useSelector : 함수형 컴포넌트의 훅.

    console.log(todoList)
    // slicing으로 뽑기
    let year = date[0];
    let month = date[1];
    let date_ = date[2];
    
    //오늘의 todolist
    const todayTodos = todoList.filter((todo) => {
        return todo.year === year && todo.month === month && todo.day === date_})
    
    let arrListView;
    if(todayTodos) {
        //개수 오류 안나게 length 체크해서 시간순 sort
        if(todayTodos.length > 1) {
            todayTodos.sort(function (a,b){
                return a.hour - b.hour || a.minute - b.minute     // 자바스크립트의 오름차순 정렬법
            });
        }
        arrListView = todayTodos.map((todo, index) => {
            return <ListView todayTodos={todo} key={index}/>  // 자식 컴포넌트 ListView에 넘겨주는 데이터(props)
        });
    }

    if (notThisMonth) {
        return (<Day>
                    <Yoil style={{ color: '#CFCFCF' }}>{day}</Yoil>
                    {arrListView}
                </Day>);
    } else if (today === 'yes') {
        return (<Day>
                    <Yoil style={{
                        color: 'white',
                        backgroundColor: '#E3302E',
                        borderRadius: '100%',
                    }}>{day}</Yoil>
                    {/* for문 돌면서 만들어줘 <ListView /> */}
                    {arrListView}
                </Day>);
    } else {
        return (<Day>
                    <Yoil >{day}</Yoil>
                    {arrListView}
                </Day>);
    }
}

export default Date;

const Day = styled.div`
    text-align:left;
    width:30%;
    min-height: 90px; 
`;
const Yoil = styled.span`
    margin:5px;
    font-size: 11px;
    padding:3px;
    position: relative;
    top:5px;
    font-family: "YESGothic-Bold";
`;