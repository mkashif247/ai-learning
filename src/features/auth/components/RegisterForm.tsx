'use client';

import { TextInput, PasswordInput, Button, Paper, Title, Text, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const RegisterForm = (): React.ReactNode => {
  const router = useRouter();
  const form = useForm({
    initialValues: { name: '', email: '', password: '' },
    validate: {
      name: (val: string) => (val.length < 2 ? 'Name should have at least 2 letters' : null),
      email: (val: string) => (/^\\S+@\\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) => (val.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values): Promise<void> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const signInRes = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (signInRes?.ok) {
          router.push('/dashboard');
        }
      } else {
        const data = await res.json();
        form.setFieldError('email', data.error || 'Registration failed');
      }
    } catch {
      form.setFieldError('email', 'An unexpected error occurred');
    }
  };

  return (
    <Container size="xs" my={60}>
      <Title ta="center" className="text-zinc-900 dark:text-zinc-50">
        Create an account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <a href="/login" className="text-brand-600 hover:underline">
          Sign in
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
            label="Name"
            placeholder="Your name"
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            mt="md"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Strong password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
