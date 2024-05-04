import PropTypes from 'prop-types';

// --- архитектура мать вашу!!!
import ShareTooltip from 'features/share-tooltip';
// ---

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
      <div className={`${style['stat']} ${fullConfig ? style['off-border'] : null}`}>
        <div className={style['stat__container']}>
          <p>{formatDate(stat.date)}</p>
        </div>

        <div className={style['stat__container']}>
          <p className={`${style['stat__icon']} ${style['stat__icon-views']}`}>{stat.viewsCount}</p>
        </div>

        <div className={style['stat__container']}>
          {fullConfig ? (
            <ShareTooltip />
          ) : (
            <p className={`${style['stat__icon']} ${style['stat__icon-comments']}`}>{stat.commentsCount}</p>
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
