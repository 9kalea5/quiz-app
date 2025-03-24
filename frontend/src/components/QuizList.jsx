import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes } from './api';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzes();
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading quizzes...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quizzes</h2>
        <Link to="/quizzes/new" className="btn btn-primary">
          Create New Quiz
        </Link>
      </div>
      
      <div className="list-group">
        {quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            to={`/quizzes/${quiz.id}`}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex justify-content-between">
              <h5>{quiz.title}</h5>
              <span className="badge bg-secondary">
                {quiz.question_count} questions
              </span>
            </div>
            <small className="text-muted">
              Created: {new Date(quiz.created_at).toLocaleDateString()}
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
};
