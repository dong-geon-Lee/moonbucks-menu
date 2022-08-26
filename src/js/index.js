import { $ } from "../utils/dom.js";
import MenuApi from "../api/index.js";

const formTag = $("#espresso-menu-form");
const inputTag = $("#espresso-menu-name");
const ulTag = $("#espresso-menu-list");
const navTag = $("nav");
const h2Tag = $("#category-title");

function App() {
  // this를 이용한 변수 선언 (배열)
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";
  console.log(this.menu, "?");
  // App 시작 시,즉시 init메서드가 호출되어 웹페이지가 렌더링된다.
  this.init = async () => {
    // 로컬스토리지에 저장된 값을 찾는다.
    console.log(this.currentCategory, "init");

    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );

    // if (store.getLocalStorage()) {
    // 결과값을 menu에 할당한다.
    // this.menu = store.getLocalStorage();
    // this.menu.push(...store.getLocalStorage());
    // }

    // 렌더 함수를 호출하여 렌더링을 진행한다.
    render();
  };

  const render = async () => {
    // localStorage에 있는 데이터를 이용해서 렌더링
    // App의 메서드 init 함수는 this.menu에 값을 할당한다.
    // render함수는 this.menu로 menu에 접근 할 수 있다.

    const data = await MenuApi.getAllMenuByCategory(this.currentCategory);

    console.log(data);

    const template = data
      ?.map((menuItem) => {
        return `
      <li data-menu-id="${
        menuItem.id
      }" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${
          menuItem.isSoldOut ? "sold-out" : ""
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
    updateMenuCount(data.length);
  };

  // 메뉴개수 표시 & input 초기화
  const updateMenuCount = (dataCount) => {
    // 상태관리에 맞게 이용하는것이 좋다. this.menu를 써라
    // const menuCount = this.menu[this.currentCategory].length;
    // ulTag가 가지고 있는 모든 li의 길이를 구한다.
    // const menuCount = ulTag.querySelectorAll("li").length;

    const menuCount = dataCount;

    // 변경된 개수를 새롭게 적용한다.
    $(".menu-count").textContent = menuCount ? `총 ${menuCount}개` : "";

    // input 값을 초기화 시킨다.
    inputTag.value = "";
  };

  // 메뉴목록 추가
  const addMenuName = async () => {
    // 사용자가 입력한 input 값을 this.menu에 단순히 추가한다.
    if (inputTag.value === "") {
      alert("값을 입력해주세요");
      return;
    }

    const duplicatedItem = this.menu[this.currentCategory].find(
      (item) => item.name === inputTag.value
    );

    if (duplicatedItem) {
      alert("이미 등록된 메뉴입니다. 다시 입력해주세요.");
      console.log(duplicatedItem);
      return;
    }

    // this.menu[this.currentCategory].push({ name: inputTag.value });
    // store.setLocalStorage(this.menu);
    // this를 이용한 전역변수 menu를 로컬스토리지에 저장한다.

    // this.menu[categoryName].push({name:inputTag.value});
    // store.setLocalStorage(categoryName,this.menu[categoryName]);
    await MenuApi.createMenu(this.currentCategory, inputTag.value);

    // 렌더 함수를 호출한다.
    render();
  };

  // 메뉴이름 변경
  const updateMenuName = async (e) => {
    // 인덱스 반환
    const targetdLi = e.target.closest("li");
    const menuId = targetdLi.dataset.menuId;
    const $menuName = targetdLi.querySelector(".menu-name");

    const updatedMenuName = prompt(
      "메뉴명을 수정해주세요",
      $menuName.textContent
    );

    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);

    render();

    // index 반환, this.menu[0], this.menu[1] ...
    // 선택한 리스트의 이름에 프롬프트값을 넣어준다.
    // this.menu[this.currentCategory][menuId].name = updatedMenuName;

    // 로컬스토리지에 변경사항 반영
    // store.setLocalStorage(this.menu);

    // text 변경을 반영한다. render함수가 별도로 작동하지 않기 떄문에
    // $menuName.textContent = updatedMenuName;

    // render 함수로 대체
  };

  // 메뉴목록 삭제
  const removeMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;

    await MenuApi.deleteMenu(this.currentCategory, menuId);
    // this.menu[this.currentCategory].splice(menuId, 1);
    // store.setLocalStorage(this.menu);

    render();
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);

    render();
    // this.menu[this.currentCategory][menuId].soldOut =
    // / !this.menu[this.currentCategory][menuId].soldOut;

    // store.setLocalStorage(this.menu);
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

  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");

    if (isCategoryButton) {
      // nav 태그 클릭 시, name 저장
      const categoryName = e.target.dataset.categoryName;

      // name 값 저장
      this.currentCategory = categoryName;

      // this로 상태값이 변경되어서 인자로 값을 넘겨줄 필요가 없다.
      this.init();

      const categoryTitle = e.target.textContent;
      h2Tag.textContent = `${categoryTitle} 메뉴 관리`;
    }
  };

  navTag.addEventListener("click", changeCategory);
}

const app = new App();
app.init();
