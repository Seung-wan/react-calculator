import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const CalculatorButton = ({ type = 'button', className, children, ...props }: PropsWithChildren<Props>) => {
  return (
    <button {...props} type={type} className={className}>
      {children}
    </button>
  );
};

export default CalculatorButton;
