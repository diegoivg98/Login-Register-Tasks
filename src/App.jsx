import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';

function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path="/" element={ LoginForm } />
      </Routes>
   </BrowserRouter>
  )
}

export default App
