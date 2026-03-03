import { Container, Group, Text } from '@mantine/core';
import { Button } from '../ui/Button';

export const Header = (): React.ReactNode => {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md w-full h-16 flex items-center fixed top-0 left-0 z-50">
      <Container size="md" className="w-full flex justify-between items-center">
        <Text fw={900} size="xl" className="text-brand-600 dark:text-brand-400">
          LearnPath
        </Text>
        <Group>
          <Button variant="subtle">Sign In</Button>
          <Button>Get Started</Button>
        </Group>
      </Container>
    </header>
  );
};
