import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// 1. Definindo as variantes
const cardVariants = cva(
  'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', // base styles
  {
    variants: {
      variant: {
        default: '',
        disabled: 'opacity-50 pointer-events-none',
        expired: 'bg-background-expired',
        cardDate: 'bg-primary-darker',
        dark: ''
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// 2. Tipagem para aceitar a prop "variant"
interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> { }

// 3. Aplicar a variante no componente
function Card({ className, variant, ...props }: CardProps) {
  return <div data-slot="card" className={cn(cardVariants({ variant }), className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6 gap-10', className)} {...props} />;
  function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-content"
        className={cn("px-6 gap-10 justify-between", className)}
        {...props}
      />
    )
  }
}

  export { Card, CardContent };
