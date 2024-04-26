import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

interface TLayout {
  pageTitle: string | undefined;
  breadcrumbs: any[];
}

export const Layout: React.FC<TLayout> = ({ pageTitle, breadcrumbs }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header_layout}>
        <div className={styles.header_container}>Header</div>
      </header>
      <div className={styles.breadcrumbs}>
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
      <main className={styles.content}>
        <h1 className={styles.page_title}>{pageTitle}</h1>
        <Outlet />
      </main>
      <footer className={styles.footer_layout}>
        <div className={styles.footer_container}>Footer</div> {/*Сюда вставляем footer*/}
      </footer>
    </div>
  );
};
