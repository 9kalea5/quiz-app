import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from './api';

export default function QuizForm() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    author: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await createQuiz(quiz);
      console.log('Quiz created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error saving quiz:', error);
      setError(error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Create New Quiz</h2>
        {error && (
          <div className="alert alert-danger">
            Error: {typeof error === 'object' ? JSON.stringify(error) : error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Quiz Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={quiz.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={quiz.author}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

