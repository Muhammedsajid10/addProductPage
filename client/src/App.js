import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Contoller/Login';
import Register from './Contoller/Register';
import ItemAddForm from './Contoller/ItemAddForm';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/itemAdd' element={<ItemAddPage/>} /> */}
          <Route path='/itemAdd' element={<ItemAddForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
