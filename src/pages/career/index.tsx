import styles from './career.module.scss';
import robot from '../../app/assets/img/career/robot.svg';
import sparkles from '../../app/assets/img/career/sparkles.svg';
import stonks from '../../app/assets/img/career/stonks.svg';
import lamp from '../../app/assets/img/career/lamp.svg';

const Career = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.head}>Карьера</h1>
      <div className={styles.career}>
        <section className={styles.intro}>
          <h2 className={styles.intro__head}>Сотрудники DNS профессионалы своего дела</h2>
          <div className={styles.advantages}>
            <div className={styles.advantages__card}>
              <div>
                <img className={styles.advantages__icon} src={robot} alt='Голова робота' />
              </div>
              <div className={styles.advantages__text}>Одними из первых знакомятся с новинками</div>
            </div>
            <div className={styles.advantages__card}>
              <div>
                <img className={styles.advantages__icon} src={sparkles} alt='Искры' />
              </div>
              <div className={styles.advantages__text}>Огромное пространство возможностей</div>
            </div>
            <div className={styles.advantages__card}>
              <div>
                <img className={styles.advantages__icon} src={lamp} alt='Лампочка' />
              </div>
              <div className={styles.advantages__text}>Постоянное обучение и развитие</div>
            </div>
            <div className={styles.advantages__card}>
              <div>
                <img className={styles.advantages__icon} src={stonks} alt='Растущий график' />
              </div>
              <div className={styles.advantages__text}>Быстрый и прозрачный карьерный рост</div>
            </div>
          </div>
          <div className={styles.alienWrap}>
            <div className={styles.alien}></div>
          </div>
        </section>
        <section className={styles.vacancies}>
          <div className={styles.city}>
            <p className={styles.city__title}>Вакансии по городу:&nbsp;</p>
            <div className={styles.dropDown}>
              <div className={styles.dropDown__selected}>Москва</div>
              <div className={styles.dropDown__inner}>
                <label className={styles.dropDown__search}>
                  <input className={styles.dropDown__input} type='text' />
                </label>
                <div className={styles.dropDown__options}>
                  <div className={styles.dropDown__option}>Абаза</div>
                  <div className={styles.dropDown__option}>Абакан</div>
                  <div className={styles.dropDown__option}>Алтуфьево</div>
                  <div className={styles.dropDown__option}>Антананариву</div>
                  <div className={styles.dropDown__option}>Абаза</div>
                  <div className={styles.dropDown__option}>Абакан</div>
                  <div className={styles.dropDown__option}>Алтуфьево</div>
                  <div className={styles.dropDown__option}>Антананариву</div>
                  <div className={styles.dropDown__option}>Абаза</div>
                  <div className={styles.dropDown__option}>Абакан</div>
                  <div className={styles.dropDown__option}>Алтуфьево</div>
                  <div className={styles.dropDown__option}>Антананариву</div>
                  <div className={styles.dropDown__option}>Абаза</div>
                  <div className={styles.dropDown__option}>Абакан</div>
                  <div className={styles.dropDown__option}>Алтуфьево</div>
                  <div className={styles.dropDown__option}>Антананариву</div>
                </div>
              </div>
            </div>
          </div>
          <label className={styles.search}>
            <span className={styles.search__icon}></span>
            <input className={styles.search__input} type='text' placeholder='Найти вакансию' />
          </label>
          <div className={styles.vacancies__list}>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Бухгалтер по учету затрат</h5>
                <div className={styles.vacancy__salary}>90 000 - 95 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Кладовщик магазина (ТРЦ Афимолл сити)</h5>
                <div className={styles.vacancy__salary}>5 000 - 9 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Программист-анальник</h5>
                <div className={styles.vacancy__salary}>100 000 - 500 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Бухгалтер по учету затрат</h5>
                <div className={styles.vacancy__salary}>90 000 - 95 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Кладовщик магазина (ТРЦ Афимолл сити)</h5>
                <div className={styles.vacancy__salary}>5 000 - 9 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Программист-анальник</h5>
                <div className={styles.vacancy__salary}>100 000 - 500 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Бухгалтер по учету затрат</h5>
                <div className={styles.vacancy__salary}>90 000 - 95 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Кладовщик магазина (ТРЦ Афимолл сити)</h5>
                <div className={styles.vacancy__salary}>5 000 - 9 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
            <a href='/career/:id' className={styles.vacancy}>
              <div className={styles.vacancy__top}>
                <h5 className={styles.vacancy__title}>Программист-анальник</h5>
                <div className={styles.vacancy__salary}>100 000 - 500 000 ₽</div>
              </div>
              <div className={styles.vacancy__city}>г. Москва</div>
            </a>
          </div>
        </section>
        <section className={styles.questions}>
          <div className={styles.questions__text}>
            <h5 className={styles.questions__title}>Мы будем рады с вами сотрудничать</h5>
            <p className={styles.questions__description}>
              Расскажите нам о себе, возможно, вы именно тот, кто нам нужен!
            </p>
          </div>
          <a className={styles.questions__anchor} href='/'>
            <button className={styles.questions__button} type='button'>
              Заполнить анкету
            </button>
          </a>
        </section>
      </div>
    </div>
  );
};

export default Career;
