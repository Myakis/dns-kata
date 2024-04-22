# О проекте
Данный проект - мини-копия сайта [DNS](https://www.dns-shop.ru/actions/)
  
Как правило, в задачах, нужно будет полностью повторить функционал и дизайн некоторой [фичи](https://hsbi.hse.ru/articles/ficha-chto-eto-znachit/) dns.

У вас будет пример перед глазами, что именно нужно сделать, как это работает и как это выглядит


### Основные библиотеки

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Redux toolkit](https://redux-toolkit.js.org/)
- [RTK-Query](https://redux-toolkit.js.org/rtk-query/overview/)
- [Styled-components](https://styled-components.com/)

### Основные команды
| Command           | Description                                                |
|-------------------|------------------------------------------------------------|
| `npm run dev `    | запускает фронтенд вместе с локальным бекенд сервером      |
| `npm run start`   | запускает фронтенд                                         |                        |

### Первый локальный запуск
1. `git clone git@github.com:h0tzz/kata-project.git`
2. `cd <каталог с приложением>`, например: `cd ~/kata-project`
3. `npm ci`
4. `npm run dev`

### Структура папок проекта
- [Наглядный пример архитектуры приложения](https://github.com/sldk-yuri/realworld-react-fsd/)

| Folder Name | Description                                                                           |
|-------------|---------------------------------------------------------------------------------------|
| `app`       | настройки, стили и провайдеры для всего приложения.                              |
| `pages`     |  композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов.                                                      |
| `widgets`  | композиционный слой для соединения сущностей и фич в самостоятельные блоки (например, IssuesList, UserProfile).     |
| `features`    | взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя. (например, SendComment, AddToCart, UsersSearch)                                             |
| `entities`   | сбизнес-сущности. (например, User, Product, Order) |
| `shared`   |  переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса. (например, UIKit, libs, API) |


### API
| Api                              | Description                            |
|----------------------------------|----------------------------------------|
| `http://localhost:8000/products` | получение списка товаров               |
| `http://localhost:8000/reviews`  | получение списка отзывов               |
| `http://localhost:8000/shops`    | получение списка магазинов             |
| `http://localhost:8000/stocks`   | получение списка акций                 |
| `http://localhost:8000/corporateDepartments`| получение списка корпоративных сервисов |
| `http://localhost:8000/news`| получение списка новостей              |
| `http://localhost:8000/vacancies`| получение списка вакансий |

В качестве бекенда используется [json-server](https://www.npmjs.com/package/json-server). 
Json server предоставляет нам полноценный локальный бекенд.

Как пример, для списка продуктов, можно добавить пагинацию:

`http://localhost:8000/products?_page=7&_limit=20`

Рекомендую посмотреть эти видео:

[Json server for beginners](https://www.youtube.com/playlist?list=PLC3y8-rFHvwhc9YZIdqNL5sWeTCGxF4ya)

[Локальный сервер для проектов и тестирования](https://www.youtube.com/watch?v=odwOkxkmVH8)

