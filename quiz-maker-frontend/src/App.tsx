import './App.css'
import Home from './Pages/home'
import Quiz from './Pages/quiz';
import Result from './Pages/result';
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App
