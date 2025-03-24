import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuiz, getQuestions, deleteQuiz } from './api';

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const [quizResponse, questionsResponse] = await Promise.all([
          getQuiz(id),
          getQuestions(id),
        ]);
        setQuiz(quizResponse.data);
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(id);
        window.location.href = '/';
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{quiz.title}</h2>
          <small className="text-muted">
            Created: {new Date(quiz.created_at).toLocaleDateString()}
          </small>
        </div>
        <div>
          <Link to={`/quizzes/${id}/edit`} className="btn btn-secondary me-2">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Questions</h4>
        <Link
          to={`/quizzes/${id}/questions/new`}
          className="btn btn-primary"
        >
          Add Question
        </Link>
      </div>

      <div className="list-group">
        {questions.map((question) => (
          <div
            key={question.id}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{question.title}</h5>
                <div className="mt-2">
                  {question.answers.map((answer) => (
                    <span
                      key={answer.id}
                      className={`badge me-2 ${answer.is_right ? 'bg-success' : 'bg-secondary'}`}
                    >
                      {answer.answer_text}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/questions/${question.id}/edit`}
                className="btn btn-sm btn-outline-secondary"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
