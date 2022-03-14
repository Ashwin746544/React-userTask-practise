import './App.css';
import Users from './components/Users/Users';
import { BrowserRouter, Route } from 'react-router-dom';
import NewUser from './components/NewUser/NewUser';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/new-user' component={NewUser} />
        <Route path='/edit-user' component={NewUser} />
        <Route path='/' exact component={Users} />
      </div>
    </BrowserRouter>
  );
}

export default App;
