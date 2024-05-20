import { FC, ReactNode } from 'react';
import styles from './layout.module.scss';
import Footer from 'widgets/footer';
import Header from 'widgets/header';
import Chat from 'widgets/chat';
import { ChatBtn, ScrollBtn } from 'features/aside-helper-btns';
import ShopCard from 'pages/shopCard';

interface IProps {
  pageTitle?: string | null;
  breadcrumbs?: any;
  children: ReactNode;
}

export const Layout: FC<IProps> = ({ pageTitle, breadcrumbs, children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <div className={styles.header__container}>
          <Header />
        </div>
      </header>
      <div className={styles.layout__breadcrumbs}>
        <div className={styles.breadcrumbs__container}>{breadcrumbs}</div> {/*Здесь лежат breadcrumbs*/}
      </div>
      <main className={styles.layout__content}>
        <div className={styles.content__container}>
          <h1 className={styles.content__title}>{pageTitle}</h1>
          {children} {/*Здесь лежит контент страницы*/}
          <ShopCard />
        </div>
      </main>
      <aside className={styles.layout__aside}>
        <div className={styles.layout__helperBtns}>
          <ChatBtn />
          <ScrollBtn />
        </div>
        <div className={styles.layout__chat}>
          <Chat />
        </div>
      </aside>
      <footer className={styles.layout__footer}>
        <div className={styles.footer__container}>
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Layout;
