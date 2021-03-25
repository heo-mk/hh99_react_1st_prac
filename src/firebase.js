import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    //firebase 설정 정보
    apiKey: "AIzaSyAQkYJ6yFCGEgVVBu6w3cOxChJsiFvnp9E",
    authDomain: "react-calendar-f5663.firebaseapp.com",
    projectId: "react-calendar-f5663",
    storageBucket: "react-calendar-f5663.appspot.com",
    messagingSenderId: "334627859716",
    appId: "1:334627859716:web:7a55ee5db7c7e0afcef451",
    measurementId: "G-0X4J402QDK"
}

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기.
export { firestore };
