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

// TODO 카테고리별 메뉴판 정리
// - [x] 에스프레소 메뉴판 정리
// - [x] 프라푸치노 메뉴판 정리
// - [x] 블렌디드 메뉴판 정리
// - [x] 티바나 메뉴판 정리
// - [x] 디저트 메뉴판 정리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [x] 페이지에 최초로 로딩될때 localStorage에 에스프레소 메뉴를 읽어온다.
// - [x] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [] 품절 버튼을 추가한다.
// - [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [] 클릭이벤트에서 가장가까운 li태그의 class속성 값에 sold-out을 추가한다.
import store from "../store/index.js";
import { $ } from "../utils/dom.js";

function App() {
  const formTag = $("#espresso-menu-form");
  const inputTag = $("#espresso-menu-name");
  const ulTag = $("#espresso-menu-list");
  const navTag = $("nav");
  const h2Tag = $("#category-title");

  // this를 이용한 변수 선언 (배열)
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";

  // App 시작 시,즉시 init메서드가 호출되어 웹페이지가 렌더링된다.
  this.init = (currentCategory) => {
    // 로컬스토리지에 저장된 값을 찾는다.
    console.log(currentCategory, "init");
    if (store.getLocalStorage()) {
      // 결과값을 menu에 할당한다.
      this.menu = store.getLocalStorage();

      // this.menu.push(...store.getLocalStorage());
    }

    // 렌더 함수를 호출하여 렌더링을 진행한다.
    render();
  };

  const render = () => {
    // localStorage에 있는 데이터를 이용해서 렌더링
    // App의 메서드 init 함수는 this.menu에 값을 할당한다.
    // render함수는 this.menu로 menu에 접근 할 수 있다.
    const template = this.menu[this.currentCategory]
      ?.map((menuItem, index) => {
        return `
      <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${
          menuItem.soldOut ? "sold-out" : ""
        }">${menuItem.name}</span>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
            품절
          </button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
            수정
          </button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
            삭제
          </button>
      </li>`;
      })
      .join("");

    // ulTag를 기준으로 template가 아래에 렌더링된다.
    ulTag.innerHTML = template;
    updateMenuCount();
  };

  // 메뉴개수 표시 & input 초기화
  const updateMenuCount = () => {
    // 상태관리에 맞게 이용하는것이 좋다. this.menu를 써라
    const menuCount = this.menu[this.currentCategory].length;
    // ulTag가 가지고 있는 모든 li의 길이를 구한다.
    // const menuCount = ulTag.querySelectorAll("li").length;

    // 변경된 개수를 새롭게 적용한다.
    $(".menu-count").textContent = `총 ${menuCount}개`;

    // input 값을 초기화 시킨다.
    inputTag.value = "";
  };

  // 메뉴목록 추가
  const addMenuName = () => {
    // 사용자가 입력한 input 값을 this.menu에 단순히 추가한다.
    if (inputTag.value === "") {
      alert("값을 입력해주세요");
      return;
    }

    this.menu[this.currentCategory].push({ name: inputTag.value });
    store.setLocalStorage(this.menu);
    // this를 이용한 전역변수 menu를 로컬스토리지에 저장한다.

    // this.menu[categoryName].push({name:inputTag.value});
    // store.setLocalStorage(categoryName,this.menu[categoryName]);

    // 렌더 함수를 호출한다.
    render();
  };

  // 메뉴이름 변경
  const updateMenuName = (e) => {
    // 인덱스 반환
    const targetdLi = e.target.closest("li");
    const menuId = targetdLi.dataset.menuId;
    const $menuName = targetdLi.querySelector(".menu-name");

    const updatedMenuName = prompt(
      "메뉴명을 수정해주세요",
      $menuName.textContent
    );

    // index 반환, this.menu[0], this.menu[1] ...
    // 선택한 리스트의 이름에 프롬프트값을 넣어준다.
    this.menu[this.currentCategory][menuId].name = updatedMenuName;

    // 로컬스토리지에 변경사항 반영
    store.setLocalStorage(this.menu);

    // text 변경을 반영한다. render함수가 별도로 작동하지 않기 떄문에
    // $menuName.textContent = updatedMenuName;

    // render 함수로 대체
    render();
  };

  // 메뉴목록 삭제
  const removeMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.currentCategory].splice(menuId, 1);
    store.setLocalStorage(this.menu);

    render();
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;

    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;

    store.setLocalStorage(this.menu);
    render();
  };

  const initEventListeners = () => {};
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
    const soldOut = targetClass.contains("menu-sold-out-button");

    if (editBtn) {
      updateMenuName(e);
      return;
    }

    if (removeBtn) {
      if (confirm("정말로 삭제할까요?")) {
        removeMenuName(e);
        updateMenuCount();

        // alert("삭제되었습니다");
        return;
      } else {
        alert("취소되었습니다");
        return;
      }
    }

    // 내 솔루션
    // if (soldOut) {
    //   const soldOutMenu = e.target.closest("li").querySelector(".menu-name");
    //   soldOutMenu.classList.toggle("sold-out");
    //   return;
    // }

    if (soldOut) {
      soldOutMenu(e);
    }
  });

  navTag.addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");

    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      this.init(this.currentCategory);

      const categoryTitle = e.target.textContent;
      h2Tag.textContent = `${categoryTitle} 메뉴 관리`;
    }
  });
}

const app = new App();
app.init();
