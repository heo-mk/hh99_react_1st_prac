# React로 만드는 나만의 달력

![201812241665086436_7](https://user-images.githubusercontent.com/79818840/120118889-bb517180-c1cf-11eb-9987-e9ba1f306bdd.jpg)

**페이지 링크:** [REACT_Calendar](https://react-calendar-f5663.web.app/)
<br/>

### 개요
- 목표 : 리액트를 이용해서 달력을 만들고 배포하기
- 개발 기간 : 2021.03.19 ~ 2021.03.25
- 개발 환경 : React
- 사이트 : [파이어베이스 플랫폼](https://react-calendar-f5663.web.app/) 

## 프로젝트 특징
- 항해99의 주특기로 배운 React로 달력 구현
- 항해99에서 제공하는 강의를 듣고 프로젝트 완성
- 날짜 라이브러리인 moment.js를 이용해서 서비스 구현
- 완성후, 빌드한 파일을 firebase로 배포

## 구현에 사용한 개념
1\. **함수형** 컴포넌트만 사용(클래스 형 컴포넌트 ❌)
  - 함수형이 더 간단하고, React-hooks를 사용해 state를 다룰 수 있어서 편리하다.

2\. **React hook** 사용 (useState(), useDispatch(), useEffect(), useRef(), useSelector()) 

3\. **styled-components**를 사용
  - className 선언 불필요
  - css 속성들을 보다 편하게 관리할 수 있다.

4\. **Props**로 자식컴포넌트에게 data를 전달해 주기

5\. **Redux** 를 사용해서 정보를 저장하고 불러 와서 사용
  - Redux store에 저장된 데이터를 가져올 때 쓰는 React-hook이 useSelector

6\. **Firebase**(서버리스)를 사용해서 data를 보관할 수 있게 했다. 



## 구현 결과물
![dd](https://user-images.githubusercontent.com/79818840/120119090-c1941d80-c1d0-11eb-8bd4-15494aa485fb.JPG)
![dd2](https://user-images.githubusercontent.com/79818840/120119091-c35de100-c1d0-11eb-85f7-06c67a2417b0.JPG)
![hfh](https://user-images.githubusercontent.com/79818840/120119122-e7b9bd80-c1d0-11eb-9b6b-8c7f84157346.JPG)

