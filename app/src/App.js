import './App.css';
import Fib from './component/Fib';
import OtherPage from './component/OtherPage';

import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>  
      <Link to="/otherpage">Other Page</Link>
        <Routes>
          <Route exact path="/" element={<Fib/>} />
          <Route exact path="/otherpage" element={<OtherPage/>} />
        </Routes>
    </div>
  );
}

export default App;
