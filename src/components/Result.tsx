import React from "react";
import { CognitiveFunctionScores } from "../types";

interface ResultProps {
  scores: CognitiveFunctionScores;
  onRestart: () => void;
}

const ResultComponent: React.FC<ResultProps> = ({ scores, onRestart }) => {
  // Sort the scores by highest value
  const sortedScores = Object.entries(scores).sort(
    ([aFunc, aScore], [bFunc, bScore]) => bScore - aScore
  );

  return (
    <>
      <div className="result-container">
        <table>
          <thead>
            <tr>
              <th>Cognitive Function</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map(([functionName, score]) => (
              <tr key={functionName}>
                <td>{functionName}</td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      <button onClick={onRestart}>Restart Test</button>
    </>
  );
};

export default ResultComponent;
