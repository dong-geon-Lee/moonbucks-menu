//! step1 목표
//?  - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다
//?  - [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
//?  - [x] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
//?  - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
//?  - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
//?  - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

//? 메뉴 수정 TODO
//? - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다.
//? - [x] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

//? 메뉴 삭제 TODO
//? - [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
//? - [x] 확인 버튼을 끌릭하면 메뉴가 삭제된다.
//? - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

//! step2 목표
//? - [x] localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
//? - [x] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
//? - [x] 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
// - [x] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [x] 품절 상태 메뉴의 마크업

// TODO localStorage Read & Write
//? - [x] localStorage에 데이터를 저장한다
//? - [x] 메뉴를 추가할 때
//? - [x] 메뉴를 수정할 때
//? - [x] 메뉴를 삭제할 때
//? - [x] localStorage에 데이터를 읽어온다

// TODO 카테고리별 메뉴판 정리
//? - [x] 에스프레소 메뉴판 정리
//? - [x] 프라푸치노 메뉴판 정리
//? - [x] 블렌디드 메뉴판 정리
//? - [x] 티바나 메뉴판 정리
//? - [x] 디저트 메뉴판 정리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
//? - [x] 페이지에 최초로 로딩될때 localStorage에 에스프레소 메뉴를 읽어온다.
//? - [x] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
//? - [x] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
//? - [x] 품절 버튼을 추가한다.
//? - [x] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
//? - [x] 클릭이벤트에서 가장가까운 li태그의 class속성 값에 sold-out을 추가한다.

//! step3 목표
// TODO 서버 요청 부분
// - [x] 웹 서버를 띄운다.
// - [x] 서버에 새로운 메뉴명을 추가될 수 있도록 요청한다.
// - [x] 서버에 카테고리별 메뉴리스트를 불러온다.
// - [x] 서버에 메뉴가 수정 될 수 있도록 요청한다.
// - [x] 서버에 메뉴의 품절상태를 토글될 수 있도록 한다.
// - [x] 서버에 메뉴가 삭제 될 수 있도록 요청한다.

// TODO 리팩터링 부분
// - [x] localStorage에 저장하는 로직은 지운다.
// - [x] fetch 비동기 api를 사용하는 부분을 async await를 사용하여 구현한다.

// TODO 사용자 경험
// - [x] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외처리를 진행한다.
// - [x] 중복되는 메뉴는 추가할 수 없다.

//? ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

// step3 회고
// 1. 웹서버 띄우는것
// 2. BASE_URL 웹 서버 변수 먼저 선언
// 3. 비동기 처리하는데 해당하는 부분이 어디인지 확인하고, 웹서버에 요청하게끔 코드 짜기
// 4. 서버에 요청한 후 데이터를 받아서 화면에 렌더링 하기
// 5. 리팩터링
// - localStorage 부분 지우기
// - API 파일 따로 만들어서 진행
// - 페이지 렌더링과 관련해서 중복되는 부분을 제
// - 서버 요청 할 떄 option 객체
// - 카테고리 버튼 클릭 시 콜백
// 6. 사용자 경험 부분

// ! 오늘 얻은 인사이트
//? 1. 이벤트 위임을 어떻게 할 수 있는지 알게되어 좋았다.
//? 2. 요구사항을 전략적으로 접근해야되는지, 단계별로 세세하게 나누는 것이 중요하다
//? 3. DOM 요소를 가져올 때 $표시로 변수처럼 사용 할 수 있어서 좋았다.
//? 4. contains, closest, textContent, insertAdjacentHtml, e.target

//! step1 목표
//  - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다
//  - [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
//  - [x] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
//  - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
//  - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
//  - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// 메뉴 수정 TODO
// - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다.
// - [x] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// 메뉴 삭제 TODO
// - [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [x] 확인 버튼을 끌릭하면 메뉴가 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

//! 코드 주석 구분
// todo 내 방법 - 클래스 이름으로 찾는 방법
// const btn = e.target.className.split(" ").at(-1);
// if (btn === "menu-edit-button") {
//   console.log("수정버튼");
// } else if (btn === "menu-remove-button") {
//   console.log("제거버튼");
// }

// todo 내 방법 - 텍스트로 찾는방법
// if (e.target.textContent === "수정") {
//   console.log("수정버튼");
// } else if (e.target.textContent === "삭제") {
//   console.log("삭제버튼");
// }

// todo 내 방법 - 텍스트로 찾는방법
// 부모 요소에서 자식요소로 접근하여 길이를 구하고 있다.
//   const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;

// innerText와 textContent 차이점 style과 리플로우 발생. innerText는 좋지않다.
//   $(".menu-count").innerText = `총 ${menuCount}개`;

//   나의 솔루션
//   $(".menu-count").textContent = `총 ${_$(".menu-list-item").length}개`;

//   $("#espresso-menu-name").value = "";

// const menuItemTemplate = (espressoMenuName) => {
//   return `<li class="menu-list-item d-flex items-center py-2">
//               <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
//               <button
//                 type="button"
//                 class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
//               >
//                 수정
//               </button>
//               <button
//                 type="button"
//                 class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
//               >
//                 삭제
//               </button>
//             </li>`;
// };

// ulTag.insertAdjacentHTML("beforeend", menuItemTemplate(inputTag.value));

// const subStore = {
//   setSubLocalStorage(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
//   },
//   getSubLocalStorage(key) {
//     return JSON.parse(localStorage.getItem(key));
//   },
// };

//   this.subInit = (key) => {
//     // 로컬스토리지에 저장된 값을 찾는다.
//     if (subStore.getSubLocalStorage().length >= 1) {
//       // 결과값을 menu에 할당한다.
//       this.menu = subStore.getSubLocalStorage(key);
//     }

//     // 렌더 함수를 호출하여 렌더링을 진행한다.
//     render();
//     console.log("init이 호출되었는가??");
//   };
