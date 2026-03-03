import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from '@mantine/core';

export interface InputProps extends MantineTextInputProps {
  label: string;
}

export const Input = ({ label, ...props }: InputProps): React.ReactNode => {
  return (
    <MantineTextInput
      label={label}
      radius="md"
      classNames={{
        input: 'transition-colors focus:border-brand-500',
      }}
      {...props}
    />
  );
};
