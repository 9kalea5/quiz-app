import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList';
import QuizDetail from './components/QuizDetail';
import QuizForm from './components/QuizForm';
import QuestionForm from './components/QuestionForm';


function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quizzes/new" element={<QuizForm />} />
          <Route path="/quizzes/:id" element={<QuizDetail />} />
          <Route path="/quizzes/:id/edit" element={<QuizForm />} />
          <Route path="/quizzes/:quizId/questions/new" element={<QuestionForm />} />
          <Route path="/questions/:id/edit" element={<QuestionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;