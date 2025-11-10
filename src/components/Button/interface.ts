export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    variant?: VariantButton;
}

export type VariantButton = 'filled' | 'border'