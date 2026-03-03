'use client';

import { TextInput, PasswordInput, Button, Paper, Title, Text, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const LoginForm = (): React.ReactNode => {
  const router = useRouter();
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (val: string) => (/^\\S+@\\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) => (val.length < 1 ? 'Password is required' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values): Promise<void> => {
    const res = await signIn('credentials', {
      ...values,
      redirect: false,
    });
    if (res?.ok) {
      router.push('/dashboard');
    } else {
      form.setFieldError('email', 'Invalid credentials');
    }
  };

  return (
    <Container size="xs" my={60}>
      <Title ta="center" className="text-zinc-900 dark:text-zinc-50">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <a href="/register" className="text-brand-600 hover:underline">
          Create account
        </a>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className="bg-white dark:bg-zinc-900"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
