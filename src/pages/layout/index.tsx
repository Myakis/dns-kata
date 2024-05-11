import { useLocation, Outlet } from 'react-router-dom';
import { getPageTitle } from 'shared/utils/page-title-utils';
import { FC, ReactNode } from 'react';
import styles from './layout.module.scss';
import Footer from 'widgets/footer';
import Header from 'widgets/header';
import Chat from 'widgets/chat';

interface IProps {
  pageTitle: string | null;
  breadcrumbs: any;
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
        </div>
      </main>
      <footer className={styles.layout__footer}>
        <div className={styles.footer__container}>
          <Footer />
        </div>
      </footer>
      <div className={styles.layout__helperBtns}>
        <Chat />
      </div>
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
