import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, createTodoFB } from './redux/modules/todo';


const Todo = (props) => {
	const dispatch = useDispatch();
	const choiceDate = React.useRef(null);
	const hour = React.useRef(null);
	const minute = React.useRef(null);
	const todo = React.useRef(null);

	//const basicTodoList = useSelector((state) => state.todo.todos);

	return (
		<Container>
			<h3>일정 추가하기</h3>
			<p>
				<span>소중한 일정</span> 잊지 말기! 일정을 추가해볼까요?
			</p>
			<Time>
				<span>일시 </span>
				{/* 비교 편하게 string 형으로 그냥 가져가기 */}
				<input type="date" id="todoDate" ref={choiceDate} />
				<select ref={hour}>
					<option value="0">오전 12시</option>
					<option value="1">오전 1시</option>
					<option value="2">오전 2시</option>
					<option value="3">오전 3시</option>
					<option value="4">오전 4시</option>
					<option value="5">오전 5시</option>
					<option value="6">오전 6시</option>
					<option value="7">오전 7시</option>
					<option value="8">오전 8시</option>
					<option value="9">오전 9시</option>
					<option value="10">오전 10시</option>
					<option value="11">오전 11시</option>
					<option value="12">오후 12시</option>
					<option value="13">오후 1시</option>
					<option value="14">오후 2시</option>
					<option value="15">오후 3시</option>
					<option value="16">오후 4시</option>
					<option value="17">오후 5시</option>
					<option value="18">오후 6시</option>
					<option value="19">오후 7시</option>
					<option value="20">오후 8시</option>
					<option value="21">오후 9시</option>
					<option value="22">오후 10시</option>
					<option value="23">오후 11시</option>
				</select>

				<select ref={minute}>
					<option value="00">00분</option>
					<option value="10">10분</option>
					<option value="20">20분</option>
					<option value="30">30분</option>
					<option value="40">40분</option>
					<option value="50">50분</option>
				</select>
			</Time>
			<TodoBox>
				<span>할일</span>
				<input type="text" ref={todo} placeholder="오늘의 할일은?" />
			</TodoBox> 
			<BtnBox>
				<button
					onClick={() => {
						if (choiceDate.current.value === '' || todo.current.value === '') {
							alert('빈 칸이 없도록 작성해주세요!');
							return false;
						}

						const new_date = choiceDate.current.value.split('-');
						let new_todo = {
							id: 1,
							year: new_date[0],
							month: new_date[1],
							day: new_date[2],
							hour: hour.current.value,
							minute: minute.current.value,
							text: todo.current.value,
							done: false
						};
						dispatch(createTodoFB(new_todo));
						props.history.push('/');
					}}
				>
					등록
				</button>
				<button
					className="cancel"
					onClick={() => {
						props.history.push('/');
					}}
				>
					취소
				</button>
			</BtnBox>
		</Container>
	);
};
export default Todo;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 10px;
	& h3 {
		font-family: "YESGothic-Bold";
		font-size: 24px;
		@media (max-width: 767px) {
			font-size: 20px;
		}
	}
	& p {
		margin-top: -10px;
		font-size: 16px;
		& span {
			background-color: #FCEB9D80;
			border-radius: 10px;
			padding: 3px;
		}
		@media (max-width: 767px) {
			font-size: 14px;
		}
	}
`;

const Time = styled.div`
	width: 80%;
	padding: 30px 0 25px 0;

	& span {
		font-size: 18px;
		margin-right: 20px;
		font-family: "YESGothic-Bold";
		@media (max-width: 767px) {
			position: relative;
			left: 3px;
		}
	}
	& input {
		width: 28%;
		padding: 1px;
	}
	& select {
		width: 8%;
		padding: 3px 0;
		margin-left: 10px;
	}

	& input,
	select {
		border: 1px solid #a8a8a8;
		outline: none;
		border-radius: 3px;
	}
	@media (max-width: 767px) {
		& input {
			width: 35%;
		}
		& select {
			width: 14%;
		}
	}
`;
const TodoBox = styled.div`
	width: 80%;
	margin-top: -5px;

	& span {
		font-size: 18px;
		margin-right: 23px;
		font-family: "YESGothic-Bold";
	}
	& input {
		width: 46%;
		position: relative;
		left: 1px;
		border: 1px solid #a8a8a8;
		outline: none;
		border-radius: 3px;
		padding: 3px;
	}
	@media (max-width: 767px) {
		& input {
			width: 68%;
		}
		& span {
			position: relative;
			left: 3px;
		}
	}
`;
const BtnBox = styled.div`
	width: 80%;
	padding: 50px 0 50px 0;
	display: flex;
	justify-content: center;
	gap: 8px;
	& button {
		outline: none;
		padding: 3px 26px;
		background-color: #1e1e1d;
		color: white;
		border: 1px solid #1e1e1d;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color .3s;
		&:hover {
			background-color: #48b7da;
			border: 1px solid #48b7da;
		}
		&.cancel:hover {
			background-color: #b8b8b8;
			border: 1px solid #b8b8b8;
		}
	}
	@media (max-width: 767px) {
		flex-direction: column;
		width: 84%;
		height: 55px;

		& button {
			padding: 8px 26px;
		}
	}
`;
