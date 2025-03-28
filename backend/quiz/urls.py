from django.urls import path
from .views import (
    ListCreateQuiz,
    RetrieveUpdateDetroyQuiz,
    QuizQuestion,
    QuizQuestionDetail,
)

urlpatterns = [
    path("", ListCreateQuiz.as_view(), name="quiz_list"),  # ✅ Base URL for listing/creating quizzes
    path("<int:pk>/", RetrieveUpdateDetroyQuiz.as_view(), name="quiz_detail"),  # ✅ Access a single quiz
    path("question/<int:quiz_id>/", QuizQuestion.as_view(), name="questions"),  # ✅ Get/Create questions for a quiz
    path("question/<int:pk>/", QuizQuestionDetail.as_view(), name="question_detail"),  # ✅ Get/Update/Delete a question
]
