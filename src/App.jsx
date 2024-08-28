import "./App.css";
import {Routes,Route} from 'react-router-dom';
import Chatbot from './Components/Chatbot';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Chatbot/>}/>
    </Routes>
    </>
  );
}

export default App;
