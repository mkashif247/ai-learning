import { Title, Text, Button, Card, Group, Stack, Badge } from '@mantine/core';

export default function RoadmapsPage(): React.ReactNode {
  return (
    <div>
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
            My Roadmaps
          </Title>
          <Text c="dimmed">Your personalized AI-generated learning paths.</Text>
        </div>
        <Button>Generate New</Button>
      </Group>

      <Stack gap="md">
        <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white dark:bg-zinc-900">
          <Group justify="space-between">
            <div>
              <Group mb="xs">
                <Title order={3} className="text-xl text-zinc-900 dark:text-zinc-50">
                  Fullstack Next.js Mastery
                </Title>
                <Badge color="brand">In Progress</Badge>
              </Group>
              <Text c="dimmed" size="sm" mb="md">
                A complete guide from React principles to advanced Next.js App Router patterns and
                deployment.
              </Text>
            </div>
          </Group>
          <Button variant="light">Continue (Module 4/12)</Button>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="bg-white dark:bg-zinc-900 opacity-75"
        >
          <Group justify="space-between">
            <div>
              <Group mb="xs">
                <Title order={3} className="text-xl text-zinc-900 dark:text-zinc-50">
                  Python Data Structures
                </Title>
                <Badge color="gray">Completed</Badge>
              </Group>
              <Text c="dimmed" size="sm" mb="md">
                Core computer science concepts covering arrays, trees, graphs, and dynamic
                programming in Python.
              </Text>
            </div>
          </Group>
          <Button variant="outline" color="gray">
            Review
          </Button>
        </Card>
      </Stack>
    </div>
  );
}
