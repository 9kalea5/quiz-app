import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/vq/quiz';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getQuizzes = () => api.get('/');
export const getQuiz = (id) => api.get(`/${id}/`);
export const createQuiz = (quizData) => api.post('/', quizData);
export const updateQuiz = (id, quizData) => api.put(`/${id}/`, quizData);
export const deleteQuiz = (id) => api.delete(`/${id}/`);

export const getQuestions = (quizId) => api.get(`question/${quizId}/`);
export const getQuestion = (id) => api.get(`question/${id}/`);
export const createQuestion = (quizId, questionData) => 
  api.post(`question/${quizId}/`, questionData);
export const updateQuestion = (id, questionData) => 
  api.patch(`question/${id}/`, questionData);
export const deleteQuestion = (id) => api.delete(`question/${id}/`);


export default api;