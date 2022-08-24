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
// - [] 프라푸치노 메뉴판 정리
// - [] 블렌디드 메뉴판 정리
// - [] 티바나 메뉴판 정리
// - [] 디저트 메뉴판 정리

// TODO 카테고리별 메뉴판 정리

//

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
const navTag = $("nav");

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
  // this를 이용한 변수 선언 (배열)
  this.menu = [];

  // App 시작 시,즉시 init메서드가 호출되어 웹페이지가 렌더링된다.
  this.init = () => {
    // 로컬스토리지에 저장된 값을 찾는다.
    if (store.getLocalStorage().length >= 1) {
      // 결과값을 menu에 할당한다.
      this.menu = store.getLocalStorage();

      // this.menu.push(...store.getLocalStorage());
      // console.log(this.menu);
    }

    // 렌더 함수를 호출하여 렌더링을 진행한다.
    render();
    console.log("init이 호출되었는가??");
  };

  const render = () => {
    // localStorage에 있는 데이터를 이용해서 렌더링
    // App의 메서드 init 함수는 this.menu에 값을 할당한다.
    // render함수는 this.menu로 menu에 접근 할 수 있다.
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

    // ulTag를 기준으로 template가 아래에 렌더링된다.
    ulTag.innerHTML = template;
    updateMenuCount();
  };

  // 메뉴개수 표시 & input 초기화
  const updateMenuCount = () => {
    // ulTag가 가지고 있는 모든 li의 길이를 구한다.
    const menuCount = ulTag.querySelectorAll("li").length;

    // 변경된 개수를 새롭게 적용한다.
    $(".menu-count").textContent = `총 ${menuCount}개`;

    // input 값을 초기화 시킨다.
    inputTag.value = "";
  };

  // 메뉴목록 추가
  const addMenuName = () => {
    // 사용자가 입력한 input 값을 this.menu에 단순히 추가한다.
    this.menu.push({ name: inputTag.value });

    // this를 이용한 전역변수 menu를 로컬스토리지에 저장한다.
    store.setLocalStorage(this.menu);

    // 렌더 함수를 호출한다.
    // ?! 메서드 init을 호출을 못하는데, 어떻게 로컬스토리지의
    // ?! 값을 parsing 해서 렌더링을 할 수있는가?
    // ? 혹시 submit 할때 이벤트 preventDefault ?
    // ? 아니면 Enter 를 칠 떄, 달라지는 무언가 있는걸까?
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
    this.menu[menuId].name = updatedMenuName;

    // 로컬스토리지에 변경사항 반영
    store.setLocalStorage(this.menu);

    // text 변경을 반영한다. render함수가 별도로 작동하지 않기 떄문에
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

  navTag.addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");

    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      console.log(categoryName);
    }
  });
}

const app = new App();
app.init();
console.log(app);
