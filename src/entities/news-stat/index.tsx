import PropTypes from 'prop-types';

import ShareTooltip from 'features/share-tooltip';

import { StatTypes } from './types';
import style from './style.module.scss';

const formatDate = (date: string): string => {
  const newDate: Date = new Date(date);
  const dateArr: number[] = [newDate.getDate(), newDate.getMonth() + 1];

  return `${dateArr.map((item) => (item < 10 ? `0${item}` : item)).join('.')}.${newDate.getFullYear()}`;
};

const StatComponent: React.FC<StatTypes> = ({ fullConfig, stat }) => {
  return (
    <>
      <div className={`${style.stat__block} ${fullConfig ? style.off_border : null}`}>
        <div className={style.stat__container}>
          <p>{formatDate(stat.date)}</p>
        </div>

        <div className={style.stat__container}>
          <p className={`${style.stat_icon} ${style.stat_icon_views}`}>{stat.viewsCount}</p>
        </div>

        <div className={style.stat__container}>
          {fullConfig ? (
            <ShareTooltip />
          ) : (
            <p className={`${style.stat_icon} ${style.stat_icon_comments}`}>{stat.commentsCount}</p>
          )}
        </div>
      </div>
    </>
  );
};

StatComponent.propTypes = {
  fullConfig: PropTypes.bool,
  stat: PropTypes.shape({
    date: PropTypes.string.isRequired,
    viewsCount: PropTypes.number.isRequired,
    commentsCount: PropTypes.number,
  }).isRequired,
};

export default StatComponent;
