import './index.scss';
import StatisticsBlock from 'entities/statistics';

const App = () => {
  return (
    <>
      <h1>hello wrold</h1>
      <StatisticsBlock fullConfig={true} date='2023-09-28T09:29:23.011Z' viewsCount={1234} commentsCount={1234} />
    </>
  );
};

export default App;
