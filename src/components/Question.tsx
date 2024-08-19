// src/components/Question.tsx
import React, { useState } from "react";
import { Question, UserResponse } from "../types";

interface QuestionProps {
  question: Question;
  onAnswer: (response: UserResponse) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    onAnswer({ questionId: question.id, selectedOption: index });
  };

  return (
    <div>
      <div className="question-container">
        <p>{question.text}</p>
      </div>
      <div className="question-options">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(index)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
