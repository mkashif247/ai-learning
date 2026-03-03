import { Title, Text, Card, Group, Button } from '@mantine/core';

export default function DashboardPage(): React.ReactNode {
  return (
    <div>
      <Title order={2} className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
        Welcome Back!
      </Title>
      <Text c="dimmed" className="mb-8">
        Here is your learning summary.
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white dark:bg-zinc-900">
          <Text fw={600} size="sm" c="dimmed">
            Modules Completed
          </Text>
          <Text fw={900} size="xl" mt="xs" className="text-brand-600 dark:text-brand-400">
            12
          </Text>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white dark:bg-zinc-900">
          <Text fw={600} size="sm" c="dimmed">
            Current Roadmap
          </Text>
          <Text fw={900} size="lg" mt="xs" className="text-zinc-900 dark:text-zinc-50">
            Fullstack Next.js
          </Text>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white dark:bg-zinc-900">
          <Text fw={600} size="sm" c="dimmed">
            Practice Score
          </Text>
          <Text fw={900} size="xl" mt="xs" className="text-orange-500">
            850 XP
          </Text>
        </Card>
      </div>

      <Title order={3} className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
        Continue Learning
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white dark:bg-zinc-900">
        <Group justify="space-between">
          <div>
            <Text fw={700} className="text-zinc-900 dark:text-zinc-50">
              Advanced React Patterns
            </Text>
            <Text size="sm" c="dimmed">
              React Hooks, Context, and Performance
            </Text>
          </div>
          <Button variant="light" color="brand">
            Resume Practice
          </Button>
        </Group>
      </Card>
    </div>
  );
}
