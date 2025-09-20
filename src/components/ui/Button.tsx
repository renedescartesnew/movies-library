import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'default', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    default: 'btn--default',
    outline: 'btn--outline',
    destructive: 'btn--destructive',
    ghost: 'btn--ghost'
  };
  const sizeClasses = {
    sm: 'btn--sm',
    default: '',
    lg: 'btn--lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
