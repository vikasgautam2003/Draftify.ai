export const SHADCN_KIT = `
import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X, Check, ChevronDown, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- UTILS ---
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. CORE INPUTS ---

export const Button = ({ className, variant = 'primary', size = 'default', disabled, loading, children, ...props }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
    ghost: 'hover:bg-slate-100 text-slate-700',
    link: 'text-indigo-600 underline-offset-4 hover:underline',
    outline: 'border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10 flex items-center justify-center p-0',
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props} 
    >
      {loading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
};

export const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

export const Label = ({ className, ...props }) => (
  <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900", className)} {...props} />
);

export const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

export const Checkbox = ({ className, checked, onCheckedChange, ...props }) => (
  <input 
    type="checkbox"
    className={cn(
      "h-4 w-4 shrink-0 rounded-sm border border-slate-200 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2", 
      className
    )}
    checked={checked}
    onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
    {...props}
  />
);

export const Switch = ({ checked, onCheckedChange, className }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange && onCheckedChange(!checked)}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
      checked ? "bg-indigo-600" : "bg-slate-200",
      className
    )}
  >
    <span
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
        checked ? "translate-x-5" : "translate-x-0"
      )}
    />
  </button>
);

export const Select = ({ value, onChange, options = [], placeholder = "Select...", className }) => (
  <div className={cn("relative", className)}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
  </div>
);

export const Slider = ({ value = [0], min = 0, max = 100, step = 1, className, ...props }) => {
  return (
    <input 
       type="range" 
       min={min} 
       max={max} 
       step={step}
       className={cn("w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600", className)}
       {...props}
    />
  )
}

// --- 2. LAYOUT ---

export const Card = ({ className, ...props }) => (
  <div className={cn("rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
);
export const CardHeader = ({ className, ...props }) => <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
export const CardTitle = ({ className, ...props }) => <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />;
export const CardDescription = ({ className, ...props }) => <p className={cn("text-sm text-slate-500", className)} {...props} />;
export const CardContent = ({ className, ...props }) => <div className={cn("p-6 pt-0", className)} {...props} />;
export const CardFooter = ({ className, ...props }) => <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
export const Separator = ({ className }) => <div className={cn("shrink-0 bg-slate-200 h-[1px] w-full", className)} />;

// --- 3. NAVIGATION & OVERLAYS ---

export const Tabs = ({ defaultValue, className, children }) => {
  const [active, setActive] = useState(defaultValue);
  return (
    <div className={className} data-active={active}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) return React.cloneElement(child, { active, setActive });
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ className, active, setActive, children }) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500", className)}>
    {React.Children.map(children, child => React.cloneElement(child, { active, setActive }))}
  </div>
);

export const TabsTrigger = ({ value, className, active, setActive, children }) => (
  <button
    onClick={() => setActive(value)}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      active === value ? "bg-white text-slate-950 shadow-sm" : "hover:bg-slate-200 hover:text-slate-900",
      className
    )}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, className, active, children }) => {
  if (active !== value) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className={cn("mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2", className)}
    >
      {children}
    </motion.div>
  );
};

export const Dialog = ({ open, onOpenChange, children }) => {
    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
                onClick={() => onOpenChange(false)} 
              />
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                 className="relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
              >
                 <button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                 </button>
                 {children}
              </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
}
export const DialogContent = ({children}) => <div className="grid gap-4 py-4">{children}</div>;
export const DialogHeader = ({ className, ...props }) => <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
export const DialogFooter = ({ className, ...props }) => <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;
export const DialogTitle = ({ className, ...props }) => <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
export const DialogDescription = ({ className, ...props }) => <p className={cn("text-sm text-slate-500", className)} {...props} />;

// --- 4. DATA DISPLAY ---

export const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "border-transparent bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
    outline: "text-slate-950 border-slate-200",
    success: "border-transparent bg-emerald-500 text-white",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />
  );
};

export const Avatar = ({ className, src, alt = "Avatar", fallback = "CN", ...props }) => (
  <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100", className)} {...props}>
    {src ? <img className="aspect-square h-full w-full object-cover" src={src} alt={alt} /> : <div className="flex h-full w-full items-center justify-center text-slate-500 text-sm font-medium">{fallback}</div>}
  </div>
);

export const Table = ({ className, ...props }) => <div className="relative w-full overflow-auto"><table className={cn("w-full caption-bottom text-sm", className)} {...props} /></div>;
export const TableHeader = ({ className, ...props }) => <thead className={cn("[&_tr]:border-b", className)} {...props} />;
export const TableBody = ({ className, ...props }) => <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
export const TableRow = ({ className, ...props }) => <tr className={cn("border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100", className)} {...props} />;
export const TableHead = ({ className, ...props }) => <th className={cn("h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0", className)} {...props} />;
export const TableCell = ({ className, ...props }) => <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />;

export const Alert = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-white text-slate-950 border-slate-200",
    destructive: "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600 bg-red-50",
  };
  return <div role="alert" className={cn("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950", variants[variant], className)} {...props} />;
};
export const AlertTitle = ({ className, ...props }) => <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />;
export const AlertDescription = ({ className, ...props }) => <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />;

export const Progress = ({ value, className, ...props }) => (
  <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-slate-100", className)} {...props}>
    <div className="h-full w-full flex-1 bg-indigo-600 transition-all" style={{ transform: \`translateX(-\${100 - (value || 0)}%)\` }} />
  </div>
);
`;