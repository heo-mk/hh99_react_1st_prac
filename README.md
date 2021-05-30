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
- 날짜 라이브러리인 moment.js를 이용해서 달력의 칸칸에 날짜를 기입.
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

6\. **Firebase**(서버리스)를 사용해서 data를 보관하고 불러와서 사용
  - firestore의 "todo" collection에 데이터 저장/소환

7\. **middleware**를 사용해서 Fireabase와 Redux를 연결.

8\. 웹페이지를 반응형으로 만들기.
  - PC, 테블릿에서 사용할 수 있게 미디어 쿼리를 사용
  - PC : 화면폭이 1023px보다 큰 경우를 기준으로 width:80vw, min-height: 430px; 으로 설정
  - 태블릿 : 화면폭이 768px - 1023px 사이일 때 width:80vw, min-height: 430px; 으로 설정
  - 폰 : 화면폭이 768px 이하일 때 width:88vw, min-height: 400px로 설정

8\. **Firebase**로 이번  **배포** 


## 구현 결과물
1\. 완성된 달력
![dd](https://user-images.githubusercontent.com/79818840/120119090-c1941d80-c1d0-11eb-8bd4-15494aa485fb.JPG)

2\. **새로운 스케쥴 업로드 하고 추가하기**
  - 달력의 메인페이지에서 + 버튼을 누르면 이곳으로 이동.
  - 스케쥴을 입력하면 달력의 그 날짜에 스케쥴이 뜬다.
![dd2](https://user-images.githubusercontent.com/79818840/120119091-c35de100-c1d0-11eb-85f7-06c67a2417b0.JPG)

3\. **모달 창 띄우기(그날의 케쥴 정보)(삭제하기 & 완료하기)**
  - 완료했다면 체크하기 버튼을 눌러 완료로 설정할 수 있다.
  - 그러면 지도상에 빨간색 동그라미가 스케쥴 옆에 뜬다.
![dgfh](https://user-images.githubusercontent.com/79818840/120119518-0325c800-c1d3-11eb-841c-f35b8120ae2f.JPG)
  
  - 완료한 스케쥴의 경우 삭제버튼만 나오게 한다. 
![hfh](https://user-images.githubusercontent.com/79818840/120119122-e7b9bd80-c1d0-11eb-9b6b-8c7f84157346.JPG)
