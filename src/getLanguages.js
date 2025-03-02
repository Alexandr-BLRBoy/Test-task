// Получаем параметр lang из URL или используем системный язык по умолчанию
export function getLangFromUrl() {
  const availableLanguages = ["de", "en", "es", "fr", "ja", "pt"];
  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get('lang');

  if (lang && availableLanguages.includes(lang)) {
    return lang;
  }

  lang = navigator.language.substring(0, 2); // получаем первые два символа системного языка

  if (availableLanguages.includes(lang)) {
    return lang;
  }

  return 'en'; // по умолчанию английский
}

const prices = {
  yearly: '$39.99',
  weekly: '$6.99',
  bestOffer: '$0.48'
};

// Загрузка выбранного языка
export async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      let key = el.getAttribute("data-i18n");
      let translation = translations[key] || el.innerHTML;

      // Заменяем {{price}} на актуальное значение
      if (translation.includes("{{price}}")) {
        let priceKey = el.dataset.priceKey; // Берём ключ цены из data-price-key
        translation = translation.replace("{{price}}", prices[priceKey]);
      }

      el.innerHTML = translation;
    });
  } catch (error) {
    console.error(`Ошибка загрузки языка ${lang}:`, error);
  }
}

// Задаем атрибут lang-HTML
export function applyLanguageClass(lang) {
  console.log("Определён язык:", lang);
  document.documentElement.setAttribute("lang", lang);

  // Удаляем старые классы языка(если они есть)
  document.documentElement.classList.remove("lang-de", "lang-en", "lang-es", "lang-fr", "lang-ja", "lang-pt");

  // Добавляем новый класс
  document.documentElement.classList.add(`lang-${lang}`);
}




