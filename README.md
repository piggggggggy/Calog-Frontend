# 🧚🏻‍♀️항해99 실전프로젝트 Team Calog - 프론트(김나영, 박용태, 최지혁)

![logo](public/ReadMe-img/fat_logo.png)

🐷[Calog 링크](https://www.calog.app/)

💋[Youtube 링크]() 예정...

📗[Notion 링크]() 예정...

🍕[Backend Repo 링크](https://github.com/dennis9352/Calog-Backend)

🎨[Wireframe 링크](https://www.figma.com/file/KO3PQQwPOBCH9NKsoQFj74/%EC%B9%BC%EB%A1%9C%EB%A6%AC%EC%A6%88-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=1429%3A2272)

<a href="https://ko.reactjs.org/" target="_blank"><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>
<a href="https://javascript.info/" target="_blank"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>
<a href="https://ko.redux.js.org/" target="_blank"><img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/></a>
<a href="https://sentry.io/" target="_blank"><img src="https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=Sentry&logoColor=white"/></a>
<a href="https://aws.amazon.com/" target="_blank"><img src="https://img.shields.io/badge/AWS Amplify-FF9900?style=flat-square&logo=AWS Amplify&logoColor=white"/></a>
<a href="https://firebase.google.com/" target="_blank"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/></a>
<a href="https://reactrouter.com/" target="_blank"><img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/></a>
<a href="https://styled-components.com/" target="_blank"><img src="https://img.shields.io/badge/Styled-components-DB7093?style=flat-square&logo=Styled-components&logoColor=white"/></a>

<a href="https://ko.redux.js.org/" target="_blank"><img src="https://img.shields.io/badge/redux toolkit-764ABC?style=flat-square&logo=&logoColor=white"/></a>
<a href="https://ko.redux.js.org/" target="_blank"><img src="https://img.shields.io/badge/redux persist-764ABC?style=flat-square&logo=&logoColor=white"/></a>
<a href="https://ko.reactjs.org/" target="_blank"><img src="https://img.shields.io/badge/react helmet-61DAFB?style=flat-square&logo=&logoColor=white"/></a>
<a href="https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/Introduction" target="_blank"><img src="https://img.shields.io/badge/PWA-512BD4?style=flat-square&logo=&logoColor=white"/></a>

---
<br/>

## 목차
[1. 개요](#개요)

[2. 프로젝트 기능](#프로젝트-기능)

[3. 트러블 슈팅](#트러블-슈팅)

[4. 고객 반응 및 개선](#고객-반응-및-개선)

[5. 기타](#기타)


## 개요

- 프로젝트 이름: **Calog** (구 Calories)

- 개발 기간 : 2021년 7월 23일 ~ 2021년 8월 31일

- 개발 언어 : JavaScript

- 개발 라이브러리 : React.js

- 형상 관리 툴 : git

- 협업 툴 : git / Notion / google spreadsheets / figma / slack

- 개발 인원 : 8명
  - **Front end** : **김나영, 최지혁, 박용태**
  - **Back end** : **이경원, 박진홍, 오인웅**
  - **Designer** : **김민경, 이경미**


- 칼로리를 고민하는 사람들을 위해, 편리하게 칼로리 검색과 기록, 계산까지 한번에 할 수 있도록 도와주는 서비스

- 사용 패키지 (설명 추가 및 정리 예정)

  - react-redux, @redux-toolkit

  - axios

  - styled-components, styled-reset

  - moment

  - connected-react-router, history

  - redux-persist

  - react-slick

  - react-nice-dates

  - @nivo/pie

  - prop-types

  - lodash

  - @sentry/react, @sentry/tracing

  - react-lazyload

  - react-helmet

  - browser-image-compression, react-aws-s3??


## 프로젝트 주요 기능

  #### ⓞ 주요 기능
  - 로그인, 회원가입, 소셜로그인
  - 기록 : 바디스펙, daily 칼로리 기록 (사진, 메모), 캘린더
  - 검색 : 칼로리 검색 (필터링, 정렬, 페이징), 최근검색어, 인기검색어
  - 편의(???) : 즐겨찾기, 카트, 커스텀 식단, 직접등록
  - 기타: 피드백, 프로필 (닉네임, 사진), 스피너
  
  #### ① 로그인, 회원가입, 소셜로그인
        - axios와 axios-interceptors 를 통한 서버와 api 요청
        - csrf 토큰, access 토큰을 이용한 로그인 체크 및 보안성 향상
        - 회원가입 시 이메일, 닉네임 debounce를 통해 서버에 자동 중복 체크
        - 서버에서 passport 모듈을 이용한 소셜 로그인
        
  #### ② 기록

  #### ③ 검색
  - 검색 기능은 Calog의 메인 기능입니다. 유저가 필수적으로 사용해야 하는 기능인만큼 **직관적인 뷰, 타이핑과 클릭을 최소화**하여 **사용성**을 높이는데 초점을 맞춰서 개발했습니다.**최근검색어**와 **인기검색어**기능은 이 점을 극대화하기 위하여 부가적으로 구현한 기능입니다.
  - **칼로리 검색** 
    - keyword에 해당하는 결과값을 받아오는 기능. 무한스크롤이나 페이지네이션처럼 데이터를 끊어서 받아오지 않고 첫 검색에 한번에 해당하는 모든 데이터를 받아옴.
    - 후술할 필터링과 정렬기능을 서버요청없이 프론트에서 구현하기 위해 원본을 담는  `list`와 가공된 데이터를 담는 `filtered_list`, 두 개의 initialState 를 만들어 검색결과를 프론트에서 가공하여 출력.

        <details>
        <summary>Range Slider</summary>
        <div markdown="1">
        
        ```javascript
        const initialState = {

          // 검색 결과 리스트 (원본)
          list : [],
          // 정렬 및 필터링된 결과
          filtered_list: [],

        }
        ```
        </div>
        </details>
  
  - **칼로리 정렬**
    - `list`의 원본 값을 칼로리 오름차순, 내림차순, 이름 으로 정렬해 `filtered_list`에 담아 출력

  - **칼로리 필터링**
    - Range Slider 를 직접 구현해, 최소값과 최대값 사이의 값들만 `filter_list`에 담아 출력
        <details>
        <summary>RangeSlider 구현 과정</summary>
        <div markdown="1">
        
        ```javascript
        const [minVal, setMin] = useState(min);
        const [maxVal, setMax] = useState(max);
        const minRef = useRef(min);
        const maxRef = useRef(max);
        const range = useRef();

        // percentage 변환 함수
        const getPercent = useCallback((value) => {
          return Math.round(((value-min) / (max - min)) * 100);
        }, [min, max]);

        // 왼쪽 SliderRange 조절
        useEffect(() => {
          const minPercent = getPercent(minVal);
          const maxPercent = getPercent(maxRef.current);

          if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`
          }
        }, [minVal, getPercent]);

        // 오른쪽 SliderRange 조절
        useEffect(() => {
          const minPercent = getPercent(minRef.current);
          const maxPercent = getPercent(maxVal);

          if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
          }
        }, [maxVal, getPercent]);

        // 변화 값 반환
        useEffect(() => {
          onChange({ min: minVal, max: maxVal });
        }, [minVal, maxVal, onChange]);

        // 두개의 thumb 역할을 하는 input 태그와 배경에 해당하는 SliderTrack, 가변요소인 SliderRange 를 활용하여 렌더되는 코드에 위의 요소들을 반영
        // src/componenets 경로의 Main_RangeSlider 컴포넌트에서 확인할 수 있습니다.
        ```
        </div>
        </details>

  - **페이징**
    - 후술할 [트러블 슈팅](#트러블-슈팅)에서 언급할 이슈를 해결하기위해 구현한 기능입니다.
      <details>
      <summary>페이징</summary>
      <div markdown="1">
      
      ```javascript
      // 페이징
      const [page, setPage] = useState({
        start: 0,
        end: 20,
      })
      // 더보기 버튼에 넣어줄 함수
      const nextPage = useCallback(() => {
        setPage({
          start: page.start,
          end: page.end + 20,
        })
      }, [page])
      ```
      </div>
      </details>


  #### ④ 편의
  - 편의 기능은 유저의 타이핑, 클릭을 최소화하고 **지속적**이고 **편리한 이용**을 위해 구현한 기능입니다.
  - **즐겨찾기**
    - 즐겨찾는 음식을 마킹 해놓고 쉰게 다시 찾는 기능으로 유저의 개인데이터에 저장되는 기능입니다.
  - **카트**
    - 현재는 음식담기로 바뀐 기능으로 기록할 음식을 카트에 담고 기록까지 연결하는 기능입니다. 현재는 커스텀 식단 기능이 추가되어 해당 기능으로 연결되는 역할도 병행합니다.
    - 즐겨찾기와 다르게 [redux-persist](#트러블-슈팅)로 구현된 기능입니다. 즐겨찾기처럼 지속적으로 담아놓지 않으며 휘발성이 있고 쉽게 담고 뺄 수 있기 때문에 **sessionStorage**에 저장해 해당 저장소가 비워지는 이벤트가 발생하거나 브라우저가 종료되기 전까지 데이터가 유지됩니다.
    - 해당기능은 프론트에서 운용하기에 적절한 방식(유저 정보지만 비로그인유저도 이용할 수 있고, 특정목적이 있을 때만 사용되는 점)을 갖고있는 점과 서버로의 요청을 줄이고자 하는 목적으로 구현되었습니다.
  - 일정한 식사 패턴 유저를 위한 커스텀 식단 기능 추가

  #### ⑤ 기타
        - 밋밋한 마이 페이지에 프로필 사진 기능 추가
        - 닉네임 수정 기능 추가

## 트러블 슈팅

- 변수로 브라우저에 저장되어 있는 토큰을 함수로 가져오게 함으로써 토큰이 없을 때 빈 값을 가져오는 것을 방지함

- debounce 로 닉네임, 이메일 중복체크를 자동으로 서버에 요청하려했으나 닉네임, 이메일 입력 시 생기는 리랜더링으로 인해 입력한 글자 수 만큼 요청이 생겨 debounce 를 닉네임과 이메일 값에도 줌으로써 최종 닉네임과 이메일만 서버에 요청하게 설계

- 서버에 요청받는 데이터들을 초기 변수 설정을 하지 않음으로써 생기는 문제를 데이터 형식에 맞게 기본 값을 줌으로써 


## 고객 반응 및 개선


## 기타
=======
# ✍🏻 프로젝트 소스


# 홈페이지
<img width="120" alt="스크린샷 2021-09-02 오후 7 53 55" src="https://user-images.githubusercontent.com/85402926/131833096-b9d9f321-8000-4b5c-9122-3edfcac1d54b.png">
<img width="120" alt="스크린샷 2021-09-02 오후 7 54 02" src="https://user-images.githubusercontent.com/85402926/131833115-49733c2a-cf32-48ca-8d72-c204d40792e4.png">
<img width="120" alt="스크린샷 2021-09-02 오후 7 54 11" src="https://user-images.githubusercontent.com/85402926/131833132-8a5b4b0d-25ed-4160-984e-2ad25193bf2e.png">
<img width="120" alt="스크린샷 2021-09-02 오후 7 58 11" src="https://user-images.githubusercontent.com/85402926/131833158-94ba7d6c-702e-4a57-8001-fc92f9a6e8e3.png">
<img width="120" alt="스크린샷 2021-09-02 오후 7 52 55" src="https://user-images.githubusercontent.com/85402926/131833051-8bb1bd2d-c35b-48f8-b1f0-1672177744a9.png">
<img width="120" alt="스크린샷 2021-09-02 오후 7 51 09" src="https://user-images.githubusercontent.com/85402926/131832875-2d782693-6925-42cd-a086-6fa2b52fbbe4.png">
<img width="120" alt="스크린샷 2021-09-02 오후 7 52 36" src="https://user-images.githubusercontent.com/85402926/131832997-12b95135-40ca-4f40-a6ea-0a1dea19f0fc.png">
<img width="120" alt="스크린샷 2021-09-02 오후 7 52 15" src="https://user-images.githubusercontent.com/85402926/131832931-f2e524c3-0e43-4870-b10a-c40984cc2845.png">

