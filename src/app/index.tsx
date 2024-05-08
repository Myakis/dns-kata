import { Provider } from 'react-redux';
import { setupStore } from 'shared/store';
import Footer from 'widgets/footer';
import './index.scss';
import './styles/variables.css';
import SaleItem from 'entities/sale-item';

const App = () => {
  const store = setupStore();

  return (
    <Provider store={store}>
      <SaleItem id={3214} vobler={{ text: 'NICE DICK BRO', color: 'green' }} />
      <Footer />
    </Provider>
  );
};

export default App;
