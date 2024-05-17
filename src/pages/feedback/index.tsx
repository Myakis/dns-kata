import { FC, useState } from 'react';
import clsx from 'clsx';

import Layout from 'pages/layout';
import style from './style.module.scss';

const FeedbackPage: FC = () => {
  return (
    <Layout pageTitle='Обратная связь'>
      <div className={style.feedback}></div>
    </Layout>
  );
};

export default FeedbackPage;
