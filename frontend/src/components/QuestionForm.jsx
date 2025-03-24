import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestion, createQuestion, updateQuestion } from './api';

const QuestionForm = () => {
  const { id, quizId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    title: '',
    answers: [
      { answer_text: '', is_right: false },
      { answer_text: '', is_right: false },
      { answer_text: '', is_right: false },
      { answer_text: '', is_right: false },
    ],
  });
  const [isEdit, setIsEdit] = useState(!!id);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchQuestion = async () => {
        try {
          const response = await getQuestion(id);
          setQuestion(response.data);
          setIsEdit(true);
        } catch (error) {
          console.error('Error fetching question:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchQuestion();
    }
  }, [id]);

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newAnswers = [...question.answers];
    
    if (type === 'checkbox') {
      newAnswers.forEach((answer, i) => {
        newAnswers[i].is_right = i === index ? checked : false;
      });
    } else {
      newAnswers[index][name] = value;
    }
    
    setQuestion((prev) => ({ ...prev, answers: newAnswers }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const filteredAnswers = question.answers.filter(
      (answer) => answer.answer_text.trim() !== ''
    );
    
    const questionData = {
      title: question.title,
      answers: filteredAnswers,
    };

    try {
      if (isEdit) {
        await updateQuestion(id, questionData);
      } else {
        await createQuestion(quizId, questionData);
      }
      navigate(`/quizzes/${quizId || question.quiz?.id}`);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">
          {isEdit ? 'Edit Question' : 'Create New Question'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Question
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={question.title}
              onChange={handleQuestionChange}
              required
            />
          </div>

          {question.answers.map((answer, index) => (
            <div key={index} className="mb-3">
              <label className="form-label">Answer {index + 1}</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="answer_text"
                  value={answer.answer_text}
                  onChange={(e) => handleAnswerChange(index, e)}
                  required
                />
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    name="is_right"
                    checked={answer.is_right}
                    onChange={(e) => handleAnswerChange(index, e)}
                  />
                  Correct
                </div>
              </div>
            </div>
          ))}

          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update Question' : 'Create Question'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
