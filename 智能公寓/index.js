// ===================== 1. 动态时间 =====================
function displayTime() {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  let str = `${h}:${m}:${s}`;
  document.getElementById('clock').innerHTML = str;
}
displayTime();
setInterval(displayTime, 1000);

// ===================== 2. 轮播图 =====================
let index = 0;
const inner = document.querySelector('.carousel-inner');
const imgs = document.querySelectorAll('.carousel-inner img');
const len = imgs.length;

// 自动轮播
function autoPlay() {
  index++;
  if (index >= len) index = 0;
  inner.style.transform = `translateX(${-index * 100}%)`;
}
let timer = setInterval(autoPlay, 2500);

// 手动
document.querySelector('.carousel-control-next').onclick = () => {
  clearInterval(timer);
  index++;
  if (index >= len) index = 0;
  inner.style.transform = `translateX(${-index * 100}%)`;
  timer = setInterval(autoPlay, 2500);
};
document.querySelector('.carousel-control-prev').onclick = () => {
  clearInterval(timer);
  index--;
  if (index < 0) index = len - 1;
  inner.style.transform = `translateX(${-index * 100}%)`;
  timer = setInterval(autoPlay, 2500);
};

// ===================== 3. 二级菜单显示隐藏 =====================
const items = document.querySelectorAll('.first-item');
items.forEach(item => {
  item.onmouseenter = () => {
    let sub = item.querySelector('.submenu');
    if (sub) sub.style.display = 'block';
  };
  item.onmouseleave = () => {
    let sub = item.querySelector('.submenu');
    if (sub) sub.style.display = 'none';
  };
});