import React, { useState, useEffect } from "react";
import { CognitiveFunctionScores, UserResponse, Question } from "./types";
import QuestionComponent from "./components/Question";
import ResultComponent from "./components/Result";
import questionsData from "./questions.json";

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<CognitiveFunctionScores | null>(null);

  useEffect(() => {
    // Shuffle questions and set the state
    const shuffledQuestions = shuffleArray(questionsData as Question[]);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (response: UserResponse) => {
    setResponses([
      ...responses,
      { ...response, questionIndex: currentQuestionIndex },
    ]);
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

    // Iterate over responses to calculate scores
    responses.forEach((response) => {
      // Match response to question using the questionIndex
      const question = questions[response.questionIndex];
      if (question) {
        // Ensure question has the expected format
        if (question.functionTypes.length !== 2) {
          console.error(
            `Question at index ${response.questionIndex} does not have exactly two function types.`
          );
          return;
        }

        const [function1, function2] = question.functionTypes;
        // Update scores based on selected option
        if (response.selectedOption === 0) {
          newScores[function1] += 1;
        } else if (response.selectedOption === 1) {
          newScores[function2] += 1;
        } else {
          console.error(
            `Invalid selectedOption value: ${response.selectedOption}`
          );
        }
      } else {
        console.error(`No question found at index ${response.questionIndex}`);
      }
    });

    setScores(newScores);
  };

  const restartTest = () => {
    setResponses([]);
    setCurrentQuestionIndex(0);
    setScores(null);

    // Shuffle questions again for the new test
    const shuffledQuestions = shuffleArray(questionsData as Question[]);
    setQuestions(shuffledQuestions);
  };

  return (
    <div className="container">
      <h1>Cognitive Function Test</h1>
      {scores ? (
        <ResultComponent scores={scores} onRestart={restartTest} />
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
