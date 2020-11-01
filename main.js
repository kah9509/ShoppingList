const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');

// 부모 (이벤트위임으로 바꿈)
const list = document.querySelector('.list');
list.addEventListener('click', (event) => {
  if (event.target.className === 'fas fa-plus' || event.target.className === 'footer__button') {
    onAdd();
  }
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
list.addEventListener('keypress', (event) => {
  if (event.target.className === 'footer__input' && event.key === 'Enter') {
    onAdd();
  }
});

function onAdd(params) {
  // 1. 사용자가 입력한 텍스트를 받아와야함
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  // 2. 새로운 아이템을 만들어야함. (텍스트 + 삭제 버튼)
  const item = createItem(text);
  // 3. items 에 추가한다
  items.appendChild(item);
  //4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: 'center'});
  // 5. 인풋을 초기화 한다.
  input.value = '';
  input.focus();
}

let id = 0;
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item">
      <span class="item__name">${text}</span>
      <button class="item__delete" >
        <i class="fas fa-trash-alt" data-id=${id}></i>
      </button>
    </div>
    <div class="item__divider"></div>`;
    id++;
  return itemRow;
}