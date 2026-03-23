<script setup lang="ts">
useSeoMeta({ title: 'Cookie Notice' });
</script>

<template>
  <div>
    <PageHeader class="flex justify-start items-center gap-2">
      <NuxtLink to="/">
        <button
          class="flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer p-2"
        >
          <Icon name="mingcute:arrow-left-line" :size="18" />
        </button>
      </NuxtLink>
      <span>Cookie Notice</span>
    </PageHeader>
    <div class="h-full w-full px-8 py-6">
      <div class="leading-relaxed space-y-2 prose">
        <h2>Использование файлов cookie и аналогичных технологий</h2>
        <p>
          Наш сайт использует технологии хранения данных в вашем браузере, включая файлы cookie и
          локальное хранилище (local storage), чтобы обеспечить корректную работу сайта и улучшить
          ваш пользовательский опыт.
        </p>

        <h2>Какие технологии мы используем</h2>
        <p>Мы используем следующие технологии для хранения информации:</p>
        <ul>
          <li>
            <b>Файлы cookie</b> - небольшие текстовые файлы, которые сохраняются на вашем устройстве
          </li>
          <li>
            <b>Локальное хранилище (local storage)</b> - технология для хранения данных
            непосредственно в вашем браузере
          </li>
        </ul>

        <h2>Сбор информации о источнике трафика</h2>
        <p>
          При переходе на наш сайт мы собираем и сохраняем в локальное хранилище информацию из
          параметров ссылки:
        </p>
        <ul>
          <li>
            <b>Параметр "source"</b> - сайт-источник перехода (например: twitch.tv, t.me,
            google.com)
          </li>
          <li>
            <b>Параметр "from"</b> - автор или рекомендатель (например: username, example_username)
          </li>
        </ul>
        <p>
          <i>
            Примечание: эти данные анонимизированы и не используются для идентификации вас как
            личности вне контекста данного визита.
          </i>
        </p>

        <h2>Как мы используем эту информацию</h2>
        <p>Собранная информация используется исключительно в аналитических целях:</p>
        <ul>
          <li>
            Для понимания источников трафика и эффективности каналов привлечения пользователей
          </li>
          <li>Для анализа того, откуда и от кого пользователи приходят к регистрации</li>
          <li>Для улучшения работы нашего сайта и пользовательского опыта</li>
        </ul>

        <h2>Конфиденциальность и защита данных</h2>
        <p>
          <b>Вся собранная информация хранится только на серверах нашего приложения</b> и
          используется исключительно для внутренней аналитики.
        </p>
        <p>Мы не передаём и не продаём эти данные третьим лицам.</p>

        <h2>Управление настройками</h2>
        <p>
          Вы можете управлять использованием технологий хранения данных через настройки вашего
          браузера. Обратите внимание, что отключение этих технологий может повлиять на
          функциональность сайта.
        </p>
        <p>
          Чтобы получить более подробную информацию, посетите нашу
          <NuxtLink to="/privacy-policy">Политику конфиденциальности</NuxtLink>.
        </p>

        <h2>Согласие</h2>
        <p>
          Продолжая использовать наш сайт, вы соглашаетесь с использованием файлов cookie и
          аналогичных технологий в соответствии с настоящим уведомлением.
        </p>
        <p>
          Если у вас возникли вопросы относительно нашего использования технологий хранения данных,
          пожалуйста, <a href="mailto:contact@onlyfurs.ru">свяжитесь с нами</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose h2 {
  font-size: var(--text-xl);
  line-height: var(--tw-leading, var(--text-xl--line-height));
  font-weight: var(--font-weight-bold);
  margin-top: calc(var(--spacing) * 8);
}
.prose h2:first-child {
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
}
.prose a:hover {
  text-decoration: underline;
}
</style>
