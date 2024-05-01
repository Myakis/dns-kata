import { useState } from 'react';
import PropTypes from 'prop-types';

import { StatBlock } from './types';
import style from './style.module.scss';

const StatisticsBlock: React.FC<StatBlock> = ({ fullConfig, date, viewsCount, commentsCount }) => {
  const [panel, setPanel] = useState(false);

  function formatDate(date: string): string {
    const newDate: Date = new Date(date);
    const dateArr: number[] = [newDate.getDate(), newDate.getMonth() + 1];

    return `${dateArr.map((item) => (item < 10 ? `0${item}` : item)).join('.')}.${newDate.getFullYear()}`;
  }

  return (
    <>
      <div className={`${style.blockStat} ${fullConfig ? style.offBorder : null}`}>
        <div>
          <p>{formatDate(date)}</p>
        </div>

        <div>
          <p className={`${style.views} ${style.icon}`}>{viewsCount}</p>
        </div>

        <div>
          {fullConfig ? (
            <button className={`${style.button} ${style.icon}`} onClick={() => setPanel((panel) => !panel)}></button>
          ) : (
            <p className={`${style.comments} ${style.icon}`}>{commentsCount}</p>
          )}
        </div>
      </div>
    </>
  );
};

StatisticsBlock.propTypes = {
  fullConfig: PropTypes.bool,
  date: PropTypes.string.isRequired,
  viewsCount: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
};

export default StatisticsBlock;
