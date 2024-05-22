import { FC, ReactNode } from 'react'; // Импортируем типы FC (Functional Component) и ReactNode из библиотеки react
import styles from './layout.module.scss'; // Импортируем стили из файла layout.module.scss
import Footer from 'widgets/footer'; // Импортируем компонент Footer
import Header from 'widgets/header'; // Импортируем компонент Header
import Chat from 'widgets/chat'; // Импортируем компонент Chat
import { ChatBtn, ScrollBtn } from 'features/aside-helper-btns'; // Импортируем компоненты ChatBtn и ScrollBtn

// Определяем интерфейс IProps с возможными свойствами pageTitle, breadcrumbs и children
interface IProps {
  pageTitle?: string | null; // Свойство pageTitle может быть строкой или null
  breadcrumbs?: any; // Свойство breadcrumbs может быть любого типа
  children: ReactNode; // Свойство children должно быть типа ReactNode
}

// Определяем функциональный компонент Layout, который принимает свойства типа IProps
export const Layout: FC<IProps> = ({ pageTitle, breadcrumbs, children }) => {
  return (
    <div className={styles.layout}>
      {' '}
      {/* Корневой div с классом layout */}
      <header className={styles.layout__header}>
        {' '}
        {/* Заголовок страницы с классом layout__header */}
        <div className={styles.header__container}>
          {' '}
          {/* Контейнер для заголовка с классом header__container */}
          <Header /> {/* Включаем компонент Header */}
        </div>
      </header>
      <div className={styles.layout__breadcrumbs}>
        {' '}
        {/* Контейнер для хлебных крошек с классом layout__breadcrumbs */}
        <div className={styles.breadcrumbs__container}>{breadcrumbs}</div>{' '}
        {/* Контейнер для хлебных крошек с классом breadcrumbs__container, сюда передаются breadcrumbs */}
      </div>
      <main className={styles.layout__content}>
        {' '}
        {/* Основной контент страницы с классом layout__content */}
        <div className={styles.content__container}>
          {' '}
          {/* Контейнер для контента с классом content__container */}
          <h1 className={styles.content__title}>{pageTitle}</h1>{' '}
          {/* Заголовок страницы с классом content__title, сюда передается pageTitle */}
          {children} {/* Здесь будет отображаться основной контент страницы */}
        </div>
      </main>
      <aside className={styles.layout__aside}>
        {' '}
        {/* Боковая панель с классом layout__aside */}
        <div className={styles.layout__helperBtns}>
          {' '}
          {/* Контейнер для вспомогательных кнопок с классом layout__helperBtns */}
          <ChatBtn /> {/* Кнопка для открытия чата */}
          <ScrollBtn /> {/* Кнопка для прокрутки страницы вверх */}
        </div>
        <div className={styles.layout__chat}>
          {' '}
          {/* Контейнер для чата с классом layout__chat */}
          <Chat /> {/* Включаем компонент Chat */}
        </div>
      </aside>
      <footer className={styles.layout__footer}>
        {' '}
        {/* Нижний колонтитул с классом layout__footer */}
        <div className={styles.footer__container}>
          {' '}
          {/* Контейнер для нижнего колонтитула с классом footer__container */}
          <Footer /> {/* Включаем компонент Footer */}
        </div>
      </footer>
    </div>
  );
};

export default Layout; // Экспортируем компонент Layout по умолчанию
