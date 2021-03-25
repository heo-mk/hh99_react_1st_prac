import './App.css';
import React from 'react';
import { useState } from 'react';
import moment from 'moment';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { completeList } from './redux/modules/todo';
import Date from "./Date";

const Calendar = (props) => {

    const [btnChange, setBtnChange] = useState(false);
    const [getMoment, setMoment] = useState(moment());

    const changeList = () => {
        setBtnChange(!btnChange);
    }

    const today = getMoment;
    const dispatch = useDispatch();
    // 1년 단위로 계산. 1년 중 오늘은 어느 날인가
    const firstWeek = today.clone().startOf('month').week(); // 시작 주
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week(); // 끝 주

    const calendarArr = () => {
        // calendar 몸체를 만드는 함수
        let result = [];
        let week = firstWeek;
        for (week; week <= lastWeek; week++) {
            result = result.concat(
                <ThisDay key={week}>
                    {
                        Array(7).fill(0).map((data, index) => {
                            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성
                            
                            // 오늘 당일이라면  
                            if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                                return (
                                    <Date 
                                        style={{ backgroundColor: 'red' }}
                                        key={index} 
                                        today={'yes'}
                                        day={days.format('D')}
                                        month={days.format('MM')}
                                        date={days.format('YYYY.MM.DD')}/>
                                );
                            // 이번달이 아니면 날짜만 흐리게 해서 보여준다
                            } else if (days.format('MM') !== today.format('MM')) {
                                return (
                                    <Date
                                        style={{ backgroundColor: 'gray' }}
                                        key={index}
                                        day= {days.format('D')}
                                        notThisMonth={true}   // 이번 달이 아님을 인증
                                        date={days.format('YYYY.MM.DD')}/>
                                );
                            } else {   // 나머지 날들
                                return (
                                    <Date 
                                        key={index}
                                        today={'no'}
                                        day={days.format('D')}
                                        month={days.format('MM')} // 이번달
                                        date={days.format('YYYY.MM.DD')}/>
                                );
                            }
                        })
                    }
                </ThisDay>
            );
        }
        return result;
    }

    return (

        <CalendarWrap>
            <TopWrap>
                <MonthBtn onClick={() => {setMoment(getMoment.clone().subtract(1, 'month')) }}><span font-size="30px">이전달</span></MonthBtn>
                <Month>{today.format(' YYYY년 MM월 ')}</Month>
                <MonthBtn onClick={() => {setMoment(getMoment.clone().add(1, 'month')) }}><span font-size="30px">다음달</span></MonthBtn>
            </TopWrap>
            <WeekWrap>
                <Weeks>
                    <Week className="sun">SUN</Week>
                    <Week>MON</Week>
                    <Week>TUE</Week>
                    <Week>WED</Week>
                    <Week>THU</Week>
                    <Week>FRI</Week>
                    <Week className="sat">SAT</Week>
                </Weeks>
            </WeekWrap>
            <DayWrap>
                {calendarArr()}
            </DayWrap>
            <MoveBtnWrap>
                <Btns className="complete-btn" font-size="20" onClick ={() => {
                    if(btnChange === false) {
                        // dispatch(completeList())
                        // setBtnChange(true)
                        changeList();
                    } else {
                        // setBtnChange(false)
                        changeList();
                    }
                }}> 
                {btnChange === false ? "완료일정" : "전체일정"}
                </Btns>
                <Btns font-size="20" onClick={() => {
                    props.history.push("/todo");
                }}>+</Btns>
            </MoveBtnWrap>    
        </CalendarWrap>
    );
}

export default withRouter(Calendar);

const ThisDay = styled.div`
    display: flex;
`;

const MonthBtn = styled.span`
    size: 1px;
    color: red;
`;

const CalendarWrap = styled.div`
    margin:-8px auto 15px auto;
    width:83%;
    padding: 10px;
`;
const TopWrap = styled.div`
    & .month-btn{
    cursor: pointer;
    transition: color .3s;
    }
    & .month-btn:hover{
    color:#E3302E;
    }
`;
const Month = styled.span`
    font-family: "YESGothic-Bold";
    margin: 0px 15px;
    font-size: 20px;
`;
const WeekWrap = styled.div`
    border:1px solid black;
    margin-top:15px;
    padding: 5px 0px 5px 0px;
`;
const Weeks = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    align-items:center;
    padding:3px;
    & .sun{
    color:#E3302E;
    }
    & .sat{
    color:#24A5CD;
    }
    @media (max-width:767px) {

    font-size: 20px;
    }
`;
const Week = styled.div`
    font-family: "";
`;
const DayWrap = styled.div`
    display: grid;
    padding:3px;
`;
const MoveBtnWrap = styled.div`
    padding: 12px 5px 12px 0px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    gap : 0px 10px;
    @media (max-width:767px) {

    flex-direction: column;
    gap: 8px 0px;
    position: absolute;
    z-index:1500;
    right: 7px;
    bottom: 15px;
    }
`;
const Btns = styled.button`
    width:100px;
    height: 100px;
    border-radius: 100%;
    cursor: pointer;
    outline: none;
    background-color: #1e1e1d;
    border:none;
    color:white;
    font-size: 22px;
    transition: background-color .3s;

    @media (max-width:767px) {
    box-shadow: 0px 2px 5px #A5A5A5;
    }
    &:hover{
    background-color: #3BB3D8;
    }
    &.complete-btn{
    font-size: 17px;
    font-family: "YESGothic-Bold";
    &:hover{
    background-color: #DA2727;
    }
    }
`;