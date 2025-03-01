import { getLangFromUrl, loadLanguage, applyLanguageClass } from './getLanguages.js';

const link1 = "https://apple.com/";
const link2 = "https://google.com/";

const plans = document.querySelectorAll('.plan');
const btn = document.querySelector('.plan__btn');

//Узнаем, у какого плана класс active
function getActivePlan() {
  return document.querySelector('.plan.active');
}
//Добавляем обработчик для активного плана
plans.forEach(plan => {
  plan.addEventListener('click', function() {
      plans.forEach(p => p.classList.remove('active'));

      plan.classList.add('active');
  });
});

//Обработчик клика на кнопку
btn.addEventListener('click', function() {
  const activePlan = getActivePlan(); // Получаем активный план

  if (activePlan) {
      if (activePlan.id === 'apple') {
          window.location.href = link1; // Переход по ссылке для первого плана
      } else if (activePlan.id === 'google') {
          window.location.href = link2; // Переход по ссылке для второго плана
      }
  }
});


// Определяем язык и переводим контент исходя из языка
const lang = getLangFromUrl();
applyLanguageClass(lang);
loadLanguage(lang);


