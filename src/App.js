import './App.css';
import React from 'react';
import styled from "styled-components";
// import './style.scss';
// 라우팅 시켜주는 부분
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
// 같은 부모 컴포넌트인 App의 자식이면서 서로 형제 관계 컴포넌트들 불러오기 
import Todo from './Todo.js';
import Calendar from "./Calendar";
import NotFound from "./NotFound";
// 파이어베이스 연결
import { firestore } from "./firebase";
import {connect} from 'react-redux';
import {loadTodoFB} from './redux/modules/todo';

// 이 함수는 스토어가 가진 상태값을 props로 받아오기 위한 함수예요.
const mapStateTopProps = (state) => ({
    // ...state,
});

// 이 함수는 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수예요.
const mapDispatchToProps = (dispatch) => ({
    load: () => {
      dispatch(loadTodoFB())
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
      this.props.load()
    }

    render() {
      return (
        <div className="App">
          <Container>
            <Header>
              <h2>일정 관리 함께해요!</h2>
              <hr />
            </Header>
              <Switch>
                <Route path="/todo" component={Todo} />
                <Route path="/" exact component={Calendar} />
                <Route component={NotFound}/>
              </Switch>
              <Footer>
                {/* <img src={Sim}/> */}
              </Footer>
          </Container>
        </div>
        );
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));

const Container = styled.div`
  width:80vw;
  min-height: 430px;
  background-color: white;
  margin:70px auto;
  border-radius: 50px;
  text-align:center;
  position: relative;
  padding:15px 15px 20px 15px;
 
  @media (min-width: 768px) and (max-width:1023px) {
  
    width: 80vw;
 
  }
  @media (max-width:767px) {
  
    width: 88vw;
    min-height: 400px;
  }
`;
const Header = styled.div`
  & h2{
    /* font-family: 'Jeju Hallasan'; */
    font-size: 26px;
    
    @media (max-width:767px) {
  
      font-size: 20px;
  }
  }
  & hr{
    width:85%;
    border: none;
    height : 1px;
    background-color:#D3D2CE70;
    position: relative;
    top:-8px;
    z-index:20;
    
  }
`;

const Footer = styled.div`
 
  display: flex;
  position: absolute;
  z-index:1000;
  bottom: -60px;
  left:-124px;
  & img{
    width:16vw;
  }
  @media (min-width: 768px) and (max-width:1023px) {
  
    bottom: -40px;
    left:-54px;
     & img{
    width:20vw;
    }
  }
  @media (max-width:767px) {
  
    
    left:-10px;
    bottom: -30px;
     & img{
    width:22vw;
    }
  }
`;