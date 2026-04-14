import React from 'react';


const Card = ({ 
    children, 
    className = '', 
    variant = 'default',
    interactive = false,
    padding = 'default',
    brutalistLevel = 'medium',
    ...props 
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-primary text-primary-foreground brutalist-border brutalist-shadow-lg';
            case 'secondary':
                return 'bg-secondary text-secondary-foreground brutalist-border brutalist-shadow-md';
            case 'destructive':
                return 'bg-destructive text-destructive-foreground brutalist-border brutalist-shadow-md';
            case 'warning':
                return 'bg-warning text-warning-foreground brutalist-border brutalist-shadow-md';
            case 'success':
                return 'bg-success text-success-foreground brutalist-border brutalist-shadow-md';
            case 'muted':
                return 'bg-muted text-muted-foreground brutalist-border brutalist-shadow-sm';
            case 'outline':
                return 'bg-background text-foreground brutalist-border brutalist-shadow-sm';
            default:
                return 'bg-card text-card-foreground brutalist-border brutalist-shadow-sm';
        }
    };

    const getPaddingClasses = () => {
        switch (padding) {
            case 'none':
                return 'p-0';
            case 'sm':
                return 'p-4';
            case 'lg':
                return 'p-8';
            case 'xl':
                return 'p-12';
            default:
                return 'p-6';
        }
    };

    const getBrutalistClasses = () => {
        switch (brutalistLevel) {
            case 'low':
                return 'brutalist-border-thin brutalist-shadow-sm';
            case 'high':
                return 'brutalist-border-thick brutalist-shadow-lg';
            case 'extreme':
                return 'brutalist-border-thick brutalist-shadow-xl transform-none';
            default:
                return 'brutalist-border brutalist-shadow-md';
        }
    };

    const getInteractiveClasses = () => {
        if (!interactive) return '';
        return 'cursor-pointer brutalist-hover transition-transform hover:brutalist-shadow-lg';
    };

    const baseClasses = `
        brutalist-card
        ${getVariantClasses()}
        ${getPaddingClasses()}
        ${getBrutalistClasses()}
        ${getInteractiveClasses()}
        ${className}
    `?.trim();

    return (
        <div className={baseClasses} {...props}>
            {children}
        </div>
    );
};

const CardHeader = ({ children, className = '', ...props }) => {
    return (
        <div 
            className={`flex flex-col space-y-3 pb-4 border-b-3 border-current mb-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

const CardTitle = ({ children, className = '', ...props }) => {
    return (
        <h3 
            className={`text-2xl font-black tracking-tight uppercase leading-none text-brutalist ${className}`}
            {...props}
        >
            {children}
        </h3>
    );
};

const CardDescription = ({ children, className = '', ...props }) => {
    return (
        <p 
            className={`text-sm font-bold tracking-wide uppercase text-muted-foreground brutalist-text ${className}`}
            {...props}
        >
            {children}
        </p>
    );
};

const CardContent = ({ children, className = '', ...props }) => {
    return (
        <div className={`${className}`} {...props}>
            {children}
        </div>
    );
};

const CardFooter = ({ children, className = '', ...props }) => {
    return (
        <div 
            className={`flex items-center pt-4 border-t-3 border-current mt-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };