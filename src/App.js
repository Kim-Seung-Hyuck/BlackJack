import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlackJack from './Components/BlackJack';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BlackJack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
