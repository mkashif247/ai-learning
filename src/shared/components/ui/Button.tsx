import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';

export interface ButtonProps extends MantineButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, ...props }: ButtonProps): React.ReactNode => {
  return <MantineButton {...props}>{children}</MantineButton>;
};
