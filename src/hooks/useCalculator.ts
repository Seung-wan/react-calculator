import { MouseEvent, useState } from 'react';
import { calculate, validateOperand } from '../domain/calculator';

import type { CalculatorState, Operator } from '../types/calculator';

const initialCalculatorState: CalculatorState = {
  result: 0,
  operand: null,
  operator: null,
};

const useCalculator = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(initialCalculatorState);

  const clickOperand = (e: MouseEvent<HTMLButtonElement>) => {
    const { number } = e.currentTarget.dataset;
    if (!number) return;

    try {
      if (calculatorState.operand === null) {
        setCalculatorState((prev) => ({ ...prev, operand: Number(number) }));
        return;
      }

      const concatOperand = String(calculatorState.operand) + number;

      validateOperand(Number(concatOperand));

      setCalculatorState((prev) => ({ ...prev, operand: Number(concatOperand), operator: calculatorState.operator }));
    } catch (error) {
      alert(error);
    }
  };

  const clickOperator = (e: MouseEvent<HTMLButtonElement>) => {
    const { operator } = e.currentTarget.dataset;
    if (!operator) return;

    const states = [calculatorState.result, calculatorState.operand, calculatorState.operator];
    if (states.every((state) => state !== null)) {
      setCalculatorState({
        result: calculate(calculatorState),
        operand: null,
        operator: operator as Operator,
      });
      return;
    }

    setCalculatorState({
      result: calculatorState.operand ?? calculatorState.result,
      operand: null,
      operator: operator as Operator,
    });
  };

  const clickModifier = () => {
    setCalculatorState(initialCalculatorState);
  };

  return { calculatorState, clickOperand, clickOperator, clickModifier };
};

export default useCalculator;
