import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getPageTitle } from 'shared/utils';
import styles from './layout.module.scss';
import Footer from 'widgets/footer';
import { ReactNode } from 'react';

interface TLayout {
  pageTitle: string | null;
  breadcrumbs: any;
  children: ReactNode;
}

export const Layout: React.FC<TLayout> = ({ pageTitle, breadcrumbs, children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <div className={styles.header__container}>
          <header></header>
        </div>
      </header>
      <div className={styles.layout__breadcrumbs}>
        <div className={styles.breadcrumbs__container}>{breadcrumbs}</div> {/*Сюда вставляем breadcrumbs*/}
      </div>
      <main className={styles.layout__content}>
        <div className={styles.content__container}>
          <h1 className={styles.content__title}>{pageTitle}</h1>
          {children} {/*Здесь будет лежать контент страницы*/}
        </div>
      </main>
      <footer className={styles.layout__footer}>
        <div className={styles.footer__container}>
          <Footer />
        </div>{' '}
        {/*Сюда вставляем footer*/}
      </footer>
    </div>
  );
};

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  return (
    <Layout pageTitle={pageTitle} breadcrumbs={'breadcrumbs'}>
      <Outlet />
    </Layout>
  );
};
