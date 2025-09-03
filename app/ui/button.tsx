import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'default';
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    'dataCy'?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
    children,
    className,
    variant = 'default',
    type = 'button',
    onClick,
    dataCy,
    ...rest
}: ButtonProps) {
    const baseClasses = "rounded-md px-3 py-2 text-sm font-semibold text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 cursor-pointer transition-colors duration-200";

    const variantClasses = {
        default: "",
        primary: "bg-gray-900 hover:bg-gray-800",
        secondary: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    };

    const disabledClasses = "disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200";

    return (
        <>
            <button
                data-cy={dataCy}
                onClick={onClick}
                type={type}
                className={clsx(
                    baseClasses,
                    variantClasses[variant],
                    disabledClasses,
                    className
                )}
                {...rest}
            >
                {children}
            </button>
        </>
    );
}