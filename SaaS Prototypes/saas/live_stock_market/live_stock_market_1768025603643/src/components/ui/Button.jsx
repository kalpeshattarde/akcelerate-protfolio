import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import Icon from '../AppIcon';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-lg font-black tracking-widest uppercase ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground brutalist-border brutalist-shadow-sm brutalist-hover",
                destructive: "bg-destructive text-destructive-foreground brutalist-border brutalist-shadow-sm brutalist-hover",
                outline: "bg-background brutalist-border brutalist-shadow-sm brutalist-hover text-foreground",
                secondary: "bg-secondary text-secondary-foreground brutalist-border brutalist-shadow-sm brutalist-hover",
                ghost: "bg-muted text-muted-foreground brutalist-border-thin brutalist-hover",
                link: "text-primary font-black tracking-wider underline-offset-4 hover:underline",
                success: "bg-success text-success-foreground brutalist-border brutalist-shadow-sm brutalist-hover",
                warning: "bg-warning text-warning-foreground brutalist-border brutalist-shadow-sm brutalist-hover",
                danger: "bg-error text-error-foreground brutalist-border brutalist-shadow-sm brutalist-hover",
            },
            size: {
                default: "h-12 px-6 py-3",
                sm: "h-10 px-4 py-2",
                lg: "h-16 px-10 py-4",
                icon: "h-12 w-12",
                xs: "h-8 px-3 py-1 text-sm",
                xl: "h-20 px-12 py-6 text-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({
    className,
    variant,
    size,
    asChild = false,
    children,
    loading = false,
    iconName = null,
    iconPosition = 'left',
    iconSize = null,
    fullWidth = false,
    disabled = false,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : "button";

    // Icon size mapping based on button size
    const iconSizeMap = {
        xs: 16,
        sm: 18,
        default: 20,
        lg: 24,
        xl: 28,
        icon: 20,
    };

    const calculatedIconSize = iconSize || iconSizeMap?.[size] || 20;

    // Loading spinner - Brutalist style
    const LoadingSpinner = () => (
        <div className="animate-pulse mr-3">
          <div className="w-6 h-6 bg-current brutalist-border-thin"></div>
        </div>
    );

    const renderIcon = () => {
        if (!iconName) return null;
        try {
            return (
                <Icon
                    name={iconName}
                    size={calculatedIconSize}
                    className={cn(
                        "font-black",
                        children && iconPosition === 'left' && "mr-3",
                        children && iconPosition === 'right' && "ml-3"
                    )}
                />
            );
        } catch {
            return null;
        }
    };

    const renderFallbackButton = () => (
        <button
            className={cn(
                buttonVariants({ variant, size, className }),
                fullWidth && "w-full"
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {iconName && iconPosition === 'left' && renderIcon()}
            {children}
            {iconName && iconPosition === 'right' && renderIcon()}
        </button>
    );

    // When asChild is true, merge icons into the child element
    if (asChild) {
        try {
            if (!children || React.Children?.count(children) !== 1) {
                return renderFallbackButton();
            }

            const child = React.Children?.only(children);

            if (!React.isValidElement(child)) {
                return renderFallbackButton();
            }
            const content = (
                <>
                    {loading && <LoadingSpinner />}
                    {iconName && iconPosition === 'left' && renderIcon()}
                    {child?.props?.children}
                    {iconName && iconPosition === 'right' && renderIcon()}
                </>
            );

            const clonedChild = React.cloneElement(child, {
                className: cn(
                    buttonVariants({ variant, size, className }),
                    fullWidth && "w-full",
                    child?.props?.className
                ),
                disabled: disabled || loading || child?.props?.disabled,
                children: content,
            });

            return <Comp ref={ref} {...props}>{clonedChild}</Comp>;
        } catch {
            return renderFallbackButton();
        }
    }

    return (
        <Comp
            className={cn(
                buttonVariants({ variant, size, className }),
                fullWidth && "w-full"
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {iconName && iconPosition === 'left' && renderIcon()}
            {children}
            {iconName && iconPosition === 'right' && renderIcon()}
        </Comp>
    );
});

Button.displayName = "Button";
export default Button;