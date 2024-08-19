export type CognitiveFunction =
  | "Fe"
  | "Fi"
  | "Ne"
  | "Ni"
  | "Se"
  | "Si"
  | "Te"
  | "Ti";

export interface Question {
  id: number;
  text: string;
  options: string[];
  functionTypes: [keyof CognitiveFunctionScores, keyof CognitiveFunctionScores];
}

export interface UserResponse {
  questionId: number;
  selectedOption: number;
}

export interface CognitiveFunctionScores {
  [key: string]: number;
}
