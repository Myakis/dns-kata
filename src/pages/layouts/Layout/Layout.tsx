import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import styles from './Layout.module.scss';

interface TLayout {
  pageTitle: string | undefined;
  breadcrumbs: any[];
}

export const Layout: React.FC<TLayout> = ({ pageTitle, breadcrumbs }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <div className={styles.header__container}>
          <Header />
        </div>
      </header>
      <div className={styles.layout__breadcrumbs}>
        <div className={styles.breadcrumbs__container}>
          <nav>
            <ul>
              {breadcrumbs.map((breadcrumb: string, index: number) => (
                <li key={index}>
                  <a>{breadcrumb}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <main className={styles.layout__content}>
        <div className={styles.content__container}>
          <h1 className={styles.content__title}>{pageTitle}</h1>
          <Outlet />
        </div>
      </main>
      <footer className={styles.layout__footer}>
        <div className={styles.footer__container}>Footer</div> {/*Сюда вставляем footer*/}
      </footer>
    </div>
  );
};
