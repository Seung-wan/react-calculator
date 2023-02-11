export type Operator = '+' | '-' | 'X' | '/' | '=';
export type Modifier = 'AC';

export type CalculatorState = {
  result: number;
  operand: number | null;
  operator: Operator | null;
};
