import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Therapist from './pages/Therapist';
import Questions from './pages/Questions';
import TherapistDetails from './pages/TherapistDetails';
import Answer from './pages/Answer';
import AnswerDetail from './pages/AnswerDetail';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Router>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/therapists' element={<Therapist />}></Route>
          <Route path='/questions' element={<Questions />}></Route>
          <Route path='/therapist/:id' element={<TherapistDetails />}></Route>
          <Route path="/question/:id" element={<Answer />}></Route>
          <Route path='/answer/:id' element={<AnswerDetail />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
