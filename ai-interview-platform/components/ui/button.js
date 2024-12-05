// components/ui/button.js
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils'; // Utility for conditional class names

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      className
    )}
    {...props}
  />
));

Button.displayName = 'Button';

export { Button };
