type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'default';
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

export function Button({
    children,
    className,
    variant = 'default',
    type = 'button',
    onClick,
}: ButtonProps) {
    const baseClasses = "rounded-md px-3 py-2 text-sm font-semibold shadow-sm";

    const variantClasses = {
        default: "",
        primary: "bg-gray-900 text-white hover:bg-gray-600",
        secondary: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    };

    return (
        <button
            type={type}
            className={[
                baseClasses,
                variantClasses[variant],
                className,
                onClick ? 'cursor-pointer' : 'cursor-not-allowed',
            ].filter(Boolean).join(' ')}
        >
            {children}
        </button>
    );
}