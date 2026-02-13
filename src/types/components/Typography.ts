export enum TypographyVariant {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  t,
  p,
  b,
  c,
}

enum FontVariant {
  NunitoSans,
}

enum FontWeight {
  regular,
  medium,
  bold,
}

export type TypographyProps<T extends React.ElementType> = {
  as?: T;
  id?: string;
  className?: string;
  weight?: keyof typeof FontWeight;
  font?: keyof typeof FontVariant;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};
