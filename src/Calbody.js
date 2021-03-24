import './App.css';
import { useState } from 'react';
import moment from 'moment';
import styled from "styled-components";

const Calbody = () => {

    const [getMoment, setMoment] = useState(moment());

    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

    const calendarArr = () => {

        let result = [];
        let week = firstWeek;
        for (week; week <= lastWeek; week++) {
            result = result.concat(
                <CalTr key={week}>
                    {
                        Array(7).fill(0).map((data, index) => {
                            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성

                            if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                                return (
                                    <CalTd key={index} style={{ backgroundColor: 'red' }} >
                                        <calTdspan>{days.format('D')}</calTdspan>
                                    </CalTd>
                                );
                            } else if (days.format('MM') !== today.format('MM')) {
                                return (
                                    <CalTd key={index} style={{ backgroundColor: 'gray' }} >
                                        <CalTdspan>{days.format('D')}</CalTdspan>
                                    </CalTd>
                                );
                            } else {
                                return (
                                    <CalTd key={index}  >
                                        <span>{days.format('D')}</span>
                                    </CalTd>
                                );
                            }
                        })
                    }
                </CalTr>
            );
        }
        return result;
    }

    return (
        <CalBody>
            <CalBodyControl>
                <button onClick={() => {setMoment(getMoment.clone().subtract(1, 'month')) }} >이전달</button>
                <span>{today.format('YYYY 년 MM 월')}</span>
                <button onClick={() => {setMoment(getMoment.clone().add(1, 'month')) }} >다음달</button>
            </CalBodyControl>
            <CalTable>
                <CalTbody>
                    {calendarArr()}
                </CalTbody>
            </CalTable>
        </CalBody>
    );
}

export default Calbody;

const CalBody = styled.div`
    height: 100vh;
    width: 100vw;
    font-size: 1.5vh;
    display: flex;               /* display 설정해줘야 아래 flex로 해주면 direction 선택가능*/
    flex-direction: column;    /* 이건 세로순으로  태그들을 표시함 css*/
    align-items: center;       /* 이건 가로 중앙 css*/
    justify-content: center;   /* 이건 세로 중앙 css*/
`; 

const CalBodyControl = styled.div`
    display: flex;
    flex-direction: row;
`;

const CalTable = styled.table`
    display: flex;
    width: 50vw;
    height: 50vh;
`;

const CalTbody = styled.tbody`
    display: flex;
    flex-direction: column;
`;

const CalTr = styled.tr`
    display: flex;
    flex-direction: row;
`;

const CalTd = styled.td`
    display: flex;
    border: 1px solid gray;
    width: 5vw;
    height: 5vh;
`;

const CalTdspan = styled.span`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

