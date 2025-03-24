import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, createQuiz, updateQuiz } from './api';

const QuizForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    author: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchQuiz = async () => {
        try {
          const response = await getQuiz(id);
          setQuiz(response.data);
          setIsEdit(true);
        } catch (error) {
          console.error('Error fetching quiz:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateQuiz(id, quiz);
      } else {
        await createQuiz(quiz);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{isEdit ? 'Edit Quiz' : 'Create New Quiz'}</h2>
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
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update Quiz' : 'Create Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;