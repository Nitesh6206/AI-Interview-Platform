// components/ui/card.js
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bg-white shadow rounded-lg p-6', className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('border-b border-gray-200 pb-4 mb-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardBody = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mb-4', className)}
    {...props}
  />
));
CardBody.displayName = 'CardBody';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('border-t border-gray-200 pt-4', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter };
