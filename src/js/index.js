//! step2 목표
// - [ ] localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
// - [ ] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
// - [ ] 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
// - [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [ ] 품절 상태 메뉴의 마크업

// TODO localStorage Read & Write
// - [x] localStorage에 데이터를 저장한다
// - [x] 메뉴를 추가할 때
// - [x] 메뉴를 수정할 때
// - [x] 메뉴를 삭제할 때
// - [x] localStorage에 데이터를 읽어온다

// localStorage에 데이터를 저장한다.
// localStorage에 저장된 데이터를 읽어온다.
// 메뉴판 종류별로 localStorage를 관리한다.
// 페이지 새로고침 할 떄, localStorage에서 에스프레소 메뉴를 불러와서 렌더링한다.
// 품절 버튼을 추가한다.
// 품절 버튼 클릭 시, localStorage에 상태값이 저장된다.
// 클릭이벤트에서 가장 가까운 li태그의 class 속성에 sold-out class를 추가하여 상태를 변경한다.

// HTML Tag
const $ = (selector) => document.querySelector(selector);

const formTag = $("#espresso-menu-form");
const inputTag = $("#espresso-menu-name");
const ulTag = $("#espresso-menu-list");

// 로컬스토리지 메서드, 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 -  메뉴명
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  this.menu = [];

  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
      // this.menu.push(...store.getLocalStorage());

      console.log(this.menu);
    }

    render();
  };

  const render = () => {
    // localStorage에 있는 데이터를 이용해서 렌더링
    const template = this.menu
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
      })
      .join("");

    ulTag.innerHTML = template;
    updateMenuCount();
  };

  // 메뉴개수 표시 & input 초기화
  const updateMenuCount = () => {
    const menuCount = ulTag.querySelectorAll("li").length;
    $(".menu-count").textContent = `총 ${menuCount}개`;

    inputTag.value = "";
  };

  // 메뉴목록 추가
  const addMenuName = () => {
    this.menu.push({ name: inputTag.value });
    store.setLocalStorage(this.menu);
    render();
  };

  // 메뉴이름 변경
  const updateMenuName = (e) => {
    // 인덱스 반환
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");

    const updatedMenuName = prompt(
      "메뉴명을 수정해주세요",
      $menuName.textContent
    );

    // index 반환, this.menu[0], this.menu[1] ...
    this.menu[menuId].name = updatedMenuName;
    // 변경사항 반영
    store.setLocalStorage(this.menu);
    $menuName.textContent = updatedMenuName;
  };

  // 메뉴목록 삭제
  const removeMenuName = (e) => {
    const removeList = e.target.closest("li");
    removeList.remove();
  };

  // form태그가 자동으로 전송되는걸 막아준다.
  formTag.addEventListener("submit", (e) => e.preventDefault());

  // Enter 클릭 시, 메뉴의 이름을 입력받는건
  inputTag.addEventListener("keypress", (e) => {
    // 키보드 이외의 숫자코드를 쓰게 될 떄, alert창이 뜨지 않도록 추가
    if (e.key !== "Enter") return;

    if (inputTag.value === "") {
      alert("값을 입력해주세요");
      return;
    }

    if (e.key === "Enter") {
      addMenuName();
      updateMenuCount();
    }
  });

  // 버튼 클릭 시
  const submitBtn = $("#espresso-menu-submit-button");

  submitBtn.addEventListener("click", () => {
    if (inputTag.value === "") {
      alert("값을 입력해주세요");
      return;
    }

    addMenuName();
    updateMenuCount();
  });

  ulTag.addEventListener("click", (e) => {
    const targetClass = e.target.classList;
    const editBtn = targetClass.contains("menu-edit-button");
    const removeBtn = targetClass.contains("menu-remove-button");

    if (editBtn) {
      updateMenuName(e);
    }

    if (removeBtn) {
      if (confirm("정말로 삭제할꺼야?")) {
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu.splice(menuId, 1);
        store.setLocalStorage(this.menu);

        removeMenuName(e);
        updateMenuCount();

        // alert("삭제되었습니다");
      } else {
        alert("취소되었습니다");
      }
    }
  });
}

const app = new App();
app.init();
console.log(app);
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
