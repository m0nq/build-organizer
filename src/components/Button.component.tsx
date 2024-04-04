import { ReactNode } from 'react';

interface ButtonProps {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    buttonType?: string;
}

export const Button = ({ children, onClick }: ButtonProps) => {

    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
};
