import { ReactNode } from 'react';

interface ButtonProps {
    children?: ReactNode;
    className?: string;
    href?: string;
}

export const Button = ({ children, className = '' }: ButtonProps) => {

    return (
        <button
            className={`inline-block rounded bg-slate-600 py-2.5 px-6 text-sm font-bold uppercase text-white hover:bg-slate-500 hover:text-white ${className}`}>
            {children}
        </button>
    );
};
