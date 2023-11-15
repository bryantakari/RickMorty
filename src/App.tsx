import Navigation from './components/Navigation';
import { useState } from 'react';
import { BrowserRouter as Router,Route,Routes, BrowserRouter} from 'react-router-dom';
import HomePage from './components/page/HomePage';
import DetailPage from './components/page/DetailPage';
function App(){
  
  const [alertVisibility, setAlertVisibility] = useState(false);
  return (
    <>
    <BrowserRouter >
      
   
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/detail' element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;