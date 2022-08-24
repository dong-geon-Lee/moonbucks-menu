// 로컬스토리지 메서드, 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 -  메뉴명
const store = {
  // 5개의 키와 각각의 값이 필요하다.
  // 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

export default store;
