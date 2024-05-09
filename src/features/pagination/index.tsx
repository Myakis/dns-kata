import { Pagination, ConfigProvider } from 'antd';

import style from './style.module.scss';
import './antd.css';

const DnsPagination: React.FC = () => {
  return (
    <div className={style['pagination']}>
      <div className={style['pagination__block__btn']}>
        <button className={style['pagination__btn']} type='button'>
          Показать ещё
        </button>
      </div>
      <div className={style['pagination__widget']}>
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                fontSize: 16,
                fontFamily: 'PT Sans',
                fontWeightStrong: 600,
                itemSize: 60,
                controlOutlineWidth: 100,
                colorBgTextHover: '#fff3ce',
                colorBorder: '#fc8507',
                borderRadius: 0,
                marginXS: 0,
                paddingContentHorizontalSM: 100,
                paddingContentHorizontalLG: 100,
                paddingContentHorizontal: 100,
              },
            },
          }}
        >
          <Pagination
            pageSize={6}
            total={100}
            showSizeChanger={false}
            showPrevNextJumpers={false}
            showQuickJumper={false}
            responsive={false}
            itemRender={(page, type) => {
              if (type === 'prev') {
                return <i className={` ${style['fastButton']} ${style['prevButton']}`}></i>;
              }
              if (type === 'next') {
                return <i className={`${style['fastButton']} ${style['nextButton']}`}></i>;
              }
              if (type === 'page') {
                return <p className={style['pageButton']}>{page}</p>;
              }
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default DnsPagination;
