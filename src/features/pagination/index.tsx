import { Pagination, ConfigProvider } from 'antd';

import style from './style.module.scss';

const DnsPagination: React.FC = () => {
  return (
    <div className={style['container']}>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemSize: 52,
              controlOutlineWidth: 100,
            },
          },
        }}
      >
        <Pagination
          pageSize={6}
          total={100}
          showSizeChanger={false}
          showPrevNextJumpers={false}
          // showLessItems={true}
          // totalBoundaryShowSizeChanger={20}
          // onShowSizeChange
          // showTitle
          // showTotal
          showQuickJumper={false}
          responsive={false}
          itemRender={(page, type) => {
            if (type === 'next') {
              return <p className={style['nextButton']}></p>;
            }
            if (type === 'prev') {
              return <p className={style['prevButton']}></p>;
            }
            if (type === 'page') {
              return <p>{page}</p>;
            }
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default DnsPagination;
