import { cn } from '@/lib/utils';
import { TypographyProps } from '@/types/components/Typography';
import * as React from 'react';

export default function Typography<T extends React.ElementType>({
  as,
  id,
  children,
  weight = 'regular',
  className,
  variant = 't',
  ...props
}: TypographyProps<T> &
  Omit<React.ComponentProps<T>, keyof TypographyProps<T>>) {
  const Component = as || 'div';
  return (
    <Component
      id={id}
      className={cn(
        'font-nunitoSans',
        // *=============== Font Type ==================
        [
          weight === 'regular' && 'font-normal',
          weight === 'medium' && 'font-medium',
          weight === 'bold' && 'font-bold',
        ],
        // *=============== Font Variants ==================
        [
          variant === 'h1' && [
            'max-md:text-[48px] max-md:leading-14',
            'md:text-[80px] md:leading-24',
          ],

          variant === 'h2' && [
            'max-md:text-[40px] max-md:leading-12',
            'md:text-[72px] md:leading-22.5',
          ],

          variant === 'h3' && [
            'max-md:text-[32px] max-md:leading-10',
            'md:text-[60px] md:leading-20',
          ],

          variant === 'h4' && [
            'max-md:text-[28px] max-md:leading-9',
            'md:text-[48px] md:leading-15',
          ],

          variant === 'h5' && [
            'max-md:text-[24px] max-md:leading-8',
            'md:text-[32px] md:leading-9',
          ],

          variant === 'h6' && [
            'max-md:text-[20px] max-md:leading-7',
            'md:text-[28px] md:leading-8',
          ],

          variant === 't' && [
            'max-md:text-[18px] max-md:leading-7',
            'md:text-[20px] md:leading-6',
          ],

          variant === 'p' && [
            'max-md:text-[16px] max-md:leading-6',
            'md:text-[18px] md:leading-6',
          ],

          variant === 'b' && [
            'max-md:text-[14px] max-md:leading-5.5',
            'md:text-[16px] md:leading-6',
          ],

          variant === 'c' && [
            'max-md:text-[12px] max-md:leading-4',
            'md:text-[14px] md:leading-4.5',
          ],
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
