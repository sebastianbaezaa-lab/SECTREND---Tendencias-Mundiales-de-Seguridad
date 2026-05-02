import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    let variantStyles = '';
    if (variant === 'default') variantStyles = 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 font-bold';
    if (variant === 'outline') variantStyles = 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 font-bold border';
    if (variant === 'ghost') variantStyles = 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800';
    if (variant === 'danger') variantStyles = 'bg-red-600 text-white border-red-600 hover:bg-red-700 font-bold';

    let sizeStyles = '';
    if (size === 'default') sizeStyles = 'px-4 py-1.5 text-xs';
    if (size === 'sm') sizeStyles = 'px-3 py-1 text-[10px] uppercase font-bold tracking-widest';
    if (size === 'lg') sizeStyles = 'px-6 py-2.5 text-sm uppercase font-bold tracking-widest';
    if (size === 'icon') sizeStyles = 'w-8 h-8 flex items-center justify-center rounded-full';

    const baseStyles = "inline-flex items-center justify-center rounded transition-colors focus:outline-none tracking-wider disabled:opacity-50 disabled:pointer-events-none";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
