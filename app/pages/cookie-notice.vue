<template>
  <div>
    <PageHeader class="flex justify-start items-center gap-2">
      <NuxtLink to="/">
        <button class="flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer p-2">
          <Icon name="mingcute:arrow-left-line" :size="18" />
        </button>
      </NuxtLink>
      <span>Cookie Notice</span>
    </PageHeader>
    <div class="h-full w-full px-8 py-6">
      <div class="leading-relaxed space-y-2 prose">
        <h3>
          Использование файлов cookie и аналогичных технологий
        </h3>
        <p>Наш сайт использует технологии хранения данных в вашем браузере, включая файлы cookie и локальное хранилище (local storage), чтобы обеспечить корректную работу сайта и улучшить ваш пользовательский опыт.</p>

        <h3>
          Какие технологии мы используем
        </h3>
        <p>Мы используем следующие технологии для хранения информации:</p>
        <ul>
          <li><b>Файлы cookie</b> - небольшие текстовые файлы, которые сохраняются на вашем устройстве</li>
          <li><b>Локальное хранилище (local storage)</b> - технология для хранения данных непосредственно в вашем браузере</li>
        </ul>

        <h3>
          Сбор информации о источнике трафика
        </h3>
        <p>При переходе на наш сайт мы собираем и сохраняем в локальное хранилище информацию из параметров ссылки:</p>
        <ul>
          <li><b>Параметр "source"</b> - сайт-источник перехода (например: twitch.tv, t.me, google.com)</li>
          <li><b>Параметр "from"</b> - автор или рекомендатель (например: username, example_username)</li>
        </ul>

        <h3>
          Как мы используем эту информацию
        </h3>
        <p>Собранная информация используется исключительно в аналитических целях:</p>
        <ul>
          <li>Для понимания источников трафика и эффективности каналов привлечения пользователей</li>
          <li>Для анализа того, откуда и от кого пользователи приходят к регистрации</li>
          <li>Для улучшения работы нашего сайта и пользовательского опыта</li>
        </ul>

        <h3>
          Конфиденциальность и защита данных
        </h3>
        <p><b>Вся собранная информация хранится только на серверах нашего приложения</b> и используется исключительно для внутренней аналитики.</p>
        <p>Мы не передаём никаких данных третьим лицам.</p>

        <h3>
          Управление настройками
        </h3>
        <p>Вы можете управлять использованием технологий хранения данных через настройки вашего браузера. Обратите внимание, что отключение этих технологий может повлиять на функциональность сайта.</p>
        <p>Чтобы получить более подробную информацию, посетите нашу <NuxtLink to="/privacy-policy">Политику конфиденциальности</NuxtLink>.</p>

        <h3>
          Согласие
        </h3>
        <p>Продолжая использовать наш сайт, вы соглашаетесь с использованием файлов cookie и аналогичных технологий в соответствии с настоящим уведомлением.</p>
        <p>Если у вас возникли вопросы относительно нашего использования технологий хранения данных, пожалуйста, <a href="mailto:support@onlyfurs.ru">свяжитесь с нами</a>.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose h3 {
  font-size: var(--text-xl);
  line-height: var(--tw-leading, var(--text-xl--line-height));
  font-weight: var(--font-weight-bold);
  margin-top: calc(var(--spacing) * 8);
}
.prose h3:first-child {
  margin-top: 0;
}
.prose b {
  font-weight: var(--font-weight-semibold);
}
.prose ul {
  list-style-type: '–  ';
  margin-left: calc(var(--spacing) * 6);
}
.prose li::marker {
  color: var(--muted-foreground);
}
.prose a {
  color: var(--primary);
  text-decoration: underline;
}
</style>
