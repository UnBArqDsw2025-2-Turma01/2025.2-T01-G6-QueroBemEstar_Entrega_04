import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconButtonRoundProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export const IconButtonRound = ({
  icon: Icon,
  onClick,
  variant = 'ghost',
  size = 'default',
  className,
  disabled = false,
  'aria-label': ariaLabel,
}: IconButtonRoundProps) => {
  const sizeClasses = {
    default: 'h-12 w-12',
    sm: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn('rounded-full transition-all hover:scale-105', sizeClasses[size], className)}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
};
