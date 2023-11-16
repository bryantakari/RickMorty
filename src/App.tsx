import { useState } from 'react';
import { Route,Routes, BrowserRouter} from 'react-router-dom';
import HomePage from './components/page/HomePage';
import DetailPage from './components/page/DetailPage';
import Location from './components/page/Location';
function App(){
  
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [detailIdCharacter, setDetailIdCharacter] = useState(-1);
  const [charName,setCharName] = useState('');
  const settingCharName = (name:string)=>{
    setCharName(name);
  }
  return (
    <>
    <BrowserRouter >
      
   
      <Routes>
        <Route index element={<HomePage charNamePass={settingCharName}/>} />
        <Route path='/detail' element={<DetailPage charName={charName}/>} />
        <Route path='/location-list' element={<Location/>}/>
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;