import React, { useState, useEffect } from "react";
import { CognitiveFunctionScores, UserResponse, Question } from "./types";
import QuestionComponent from "./components/Question";

import questionsData from "./questions.json";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<CognitiveFunctionScores | null>(null);

  useEffect(() => {
    setQuestions(questionsData as Question[]);
  }, []);

  const handleAnswer = (response: UserResponse) => {
    setResponses([...responses, response]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScores();
    }
  };

  const calculateScores = () => {
    const newScores: CognitiveFunctionScores = {
      Fe: 0,
      Fi: 0,
      Ne: 0,
      Ni: 0,
      Se: 0,
      Si: 0,
      Te: 0,
      Ti: 0,
    };

    responses.forEach((response) => {
      const question = questions.find((q) => q.id === response.questionId);
      if (question) {
        const [function1, function2] = question.functionTypes;
        if (response.selectedOption === 0) {
          newScores[function1] += 1;
        } else {
          newScores[function2] += 1;
        }
      }
    });

    setScores(newScores);
  };

  return (
    <div className="container">
      <h1>Cognitive Function Test</h1>
      {scores ? (
        <div>
          <h2>Your Cognitive Function Scores:</h2>
          <ul>
            {Object.entries(scores).map(([functionName, score]) => (
              <li key={functionName}>
                {functionName}: {score}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        questions.length > 0 &&
        currentQuestionIndex < questions.length && (
          <QuestionComponent
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        )
      )}
    </div>
  );
};

export default App;
