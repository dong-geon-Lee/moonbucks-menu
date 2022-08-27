const $ = (selector) => document.querySelector(selector);
const formTag = $("#espresso-menu-form");
const ulTag = $("#espresso-menu-list");
const inputTag = $("#espresso-menu-name");
const buttonTag = $("#espresso-menu-submit-button");
const navTag = $("nav");
const h2Tag = $("#title");

export const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";
  this.soldOut = false;
  this.init = () => {
    console.log(this.currentCategory, "init");

    const menuList = store.getLocalStorage();
    this.menu[this.currentCategory] = menuList[this.currentCategory]
      ? menuList[this.currentCategory]
      : "espresso";

    render();
    countMenu();
  };

  const render = () => {
    const renderMenu = this.menu[this.currentCategory]
      ?.map((menuItem, index) => {
        return `<li data-day-out=${index} class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name ${menuItem.soldOut ? "sold-out" : ""}">
  ${menuItem.name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
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

    ulTag.innerHTML = renderMenu;
  };

  const countMenu = () => {
    const listCount = `총 ${ulTag.querySelectorAll("li").length}개`;
    $(".menu-count").textContent = listCount;
    inputTag.value = "";
  };

  const addMenuItem = () => {
    if (inputTag.value === "") {
      alert("값을 추가해 주세요");
      return;
    }

    this.menu[this.currentCategory]?.push({
      name: inputTag.value,
      soldOut: this.soldOut,
    });

    console.log(this.menu);
    store.setLocalStorage(this.menu);
    render();
    countMenu();
  };

  const deleteMenuItem = (e) => {
    const menuId = e.target.closest("li").dataset.dayOut;
    ulTag.querySelectorAll("li")[menuId].remove();

    this.menu[this.currentCategory] = this.menu[this.currentCategory].filter(
      (x) => x.name !== this.menu[this.currentCategory][menuId].name
    );

    store.setLocalStorage(this.menu);
    countMenu();
  };

  formTag.addEventListener("submit", (e) => e.preventDefault());

  inputTag.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenuItem();
    }
  });

  buttonTag.addEventListener("click", addMenuItem);

  ulTag.addEventListener("click", (e) => {
    if (e.target.closest(".menu-edit-button")) {
      const menuId = e.target.closest("li").dataset.dayOut;
      const menuName = e.target.closest("li").querySelector(".menu-name");

      const updateMenuName = prompt(
        "검색어를 입력해주세요",
        menuName.textContent
      );

      this.menu[this.currentCategory][menuId].name = updateMenuName
        ? updateMenuName
        : menuName[menuId].textContent;

      store.setLocalStorage(this.menu);
      menuName.textContent = updateMenuName;
    }

    if (e.target.closest(".menu-remove-button")) {
      if (confirm("삭제하시겠습니다?")) {
        deleteMenuItem(e);

        return;
      } else {
        confirm("취소되었습니다");
        return;
      }
    }

    if (e.target.closest(".menu-sold-out-button")) {
      const menuId = e.target.closest("li").dataset.dayOut;
      const menuName = e.target.closest("li").querySelector(".menu-name");
      menuName.classList.toggle("sold-out");

      console.log(this.menu[this.currentCategory][menuId]);
      console.log(this.menu[this.currentCategory][menuId].soldOut);

      this.menu[this.currentCategory][menuId].soldOut =
        !this.menu[this.currentCategory][menuId].soldOut;

      store.setLocalStorage(this.menu);
    }
  });

  navTag.addEventListener("click", (e) => {
    const targetMenu = e.target.classList.contains("cafe-category-name");

    if (targetMenu) {
      const menuBoard = e.target.closest(".cafe-category-name");
      h2Tag.textContent = `${menuBoard.textContent} 메뉴 관리`;

      this.currentCategory = menuBoard.dataset.categoryName;
      this.init();
    }
  });
}

const app = new App();
app.init();
