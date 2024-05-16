import styles from './career.module.scss';
import robot from '../../app/assets/img/career/robot.svg';
import sparkles from '../../app/assets/img/career/sparkles.svg';
import stonks from '../../app/assets/img/career/stonks.svg';
import lamp from '../../app/assets/img/career/lamp.svg';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { useGetVacanciesQuery } from 'shared/api/DNS';
import { IVacancy } from './types';

type DropDown = {
  isOpen: boolean;
  selected: string;
  allOptions: React.ReactElement[] | null;
  currentOptions: React.ReactElement[] | null;
  input: string;
};

function filteredVacanciesList(vacancies: IVacancy[], query: string, attribute: 'city' | 'name' = 'city') {
  const filterAttribute = query.trim().toLowerCase();

  return vacancies
    .filter((vacancy) => {
      const vacancyAttribute = vacancy[attribute].trim().toLowerCase();

      if (filterAttribute === 'all') {
        return true;
      }
      switch (attribute) {
        case 'name':
          return vacancyAttribute.includes(filterAttribute);
        case 'city':
          return vacancyAttribute === filterAttribute;
      }
    })
    .map((vacancy) => (
      <a href='/career' key={vacancy.id} className={styles.vacancy}>
        <div className={styles.vacancy__top}>
          <h5 className={styles.vacancy__title}>{vacancy.name}</h5>
          <div className={styles.vacancy__salary}>
            {vacancy.salaryMin.toLocaleString()} - {vacancy.salaryMax.toLocaleString()} ₽
          </div>
        </div>
        <div className={styles.vacancy__city}>г. {vacancy.city}</div>
      </a>
    ));
}

const Career = () => {
  const { data: vacancies } = useGetVacanciesQuery('');

  const [dropDown, setDropDown] = useState<DropDown>({
    isOpen: false,
    selected: '',
    allOptions: null,
    currentOptions: null,
    input: '',
  });

  const [jobList, setJobList] = useState<JSX.Element[]>();
  const [jobSearch, setJobSearch] = useState<string>('');

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const option = event.currentTarget;
    const city = option.textContent ? option.textContent : '';

    setJobList(filteredVacanciesList(vacancies!, city));
    setDropDown((prev) => ({ ...prev, currentOptions: prev.allOptions, isOpen: false, selected: city, input: '' }));
  };

  const buildOptionsList = useCallback((vacancies: IVacancy[]) => {
    const options = vacancies.map((vacancy) => (
      <button key={vacancy.city + vacancy.id} onClick={handleSelect} type='button' className={styles.dropDown__option}>
        {vacancy.city}
      </button>
    ));

    return [
      <button key={'all'} onClick={handleSelect} type='button' className={styles.dropDown__option}>
        All
      </button>,
      ...options,
    ];
  }, [vacancies]);

  useEffect(() => {
    if (!vacancies || !vacancies.length) {
      return;
    }

    const optionsList = buildOptionsList(vacancies);
    const selected = optionsList[0].props.children as string;

    setDropDown((prev) => ({
      ...prev,
      allOptions: optionsList,
      currentOptions: optionsList,
      selected: selected,
    }));

    setJobList(filteredVacanciesList(vacancies, selected));
  }, [vacancies, buildOptionsList]);

  const citySearchRef = useClickOutside(
    () => setDropDown((prev) => ({ ...prev, currentOptions: prev.allOptions, isOpen: false, input: '' })),
    'dropDown__selected'
  );

  if (!vacancies) {
    return <div>Минуточку плюс секундочку</div>;
  }

  const handleCitySearch = (event: React.FormEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    if (!query) {
      setDropDown((prev) => ({ ...prev, currentOptions: prev.allOptions, input: query ?? '' }));
      return;
    }

    const newList = dropDown.allOptions?.filter((elem) => {
      const city = elem.props.children?.toLowerCase() ?? '';

      return city.includes(query.toLowerCase());
    });

    if (!newList) {
      setDropDown((prev) => ({ ...prev, currentOptions: prev.allOptions, input: query ?? '' }));
      return;
    }

    setDropDown((prev) => ({ ...prev, currentOptions: newList, input: query }));
  };

  const handleJobSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    setJobSearch(query);
    if (!query) {
      const returnJobs = filteredVacanciesList(vacancies, dropDown.selected);

      setJobList(returnJobs);
    }

    const filteredJobs = filteredVacanciesList(vacancies, query, 'name');

    setJobList(filteredJobs);
  };

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
              <button
                type='button'
                className={styles.dropDown__selected}
                onClick={() => setDropDown((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
              >
                {dropDown.selected}
              </button>
              <div
                ref={citySearchRef}
                className={clsx(styles.dropDown__inner, dropDown.isOpen || styles.visually_hidden)}
              >
                <label className={styles.dropDown__search}>
                  <input
                    value={dropDown.input}
                    className={styles.dropDown__input}
                    type='text'
                    onChange={handleCitySearch}
                  />
                </label>
                <div className={styles.dropDown__options}>{dropDown.currentOptions}</div>
              </div>
            </div>
          </div>
          <label className={styles.search}>
            <span className={styles.search__icon}></span>
            <input
              value={jobSearch}
              onChange={handleJobSearch}
              className={styles.search__input}
              type='text'
              placeholder='Найти вакансию'
            />
          </label>
          <div className={styles.vacancies__list}>{jobList}</div>
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
