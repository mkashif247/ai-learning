import { Button, Container, Title, Text, Group } from '@mantine/core';
import { Header } from '@/shared/components/layout/Header';

export default function Home(): React.ReactNode {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 pt-20">
        <Container size="md" className="text-center">
          <Title order={1} className="text-5xl font-black mb-6 text-zinc-900 dark:text-zinc-50">
            Welcome to <span className="text-brand-600 dark:text-brand-400">LearnPath</span>
          </Title>
          <Text size="lg" className="mb-8 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
            The mentor you never had, powered by AI. No more tutorial hell. Build real skills
            through guided practice and prepare for the modern job market.
          </Text>
          <Group justify="center">
            <Button size="lg" radius="md">
              Get Started for Free
            </Button>
            <Button size="lg" variant="default" radius="md">
              View Roadmaps
            </Button>
          </Group>
        </Container>
      </main>
    </>
  );
}
