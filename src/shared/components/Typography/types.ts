export type VariantType = 'geist' | 'druk';

export type WeightType = 
  | ('geist' extends VariantType ? 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' : never)
  | ('druk' extends VariantType ? 'condensed' | 'wide' | 'text-wide' : never);

export interface TypographyProps {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: VariantType;
  weight?: WeightType;
  children: React.ReactNode | string;
  size?: number;
  lineHeight?: number;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
}