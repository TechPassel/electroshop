import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-1 main-top'>
        <Container>
          {/* <HomeScreen /> */}
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          {/* Here '?' is used to make 'id' as optional.It has nothing to do with query string */}
          <Route path='/login' component={LoginScreen}></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
