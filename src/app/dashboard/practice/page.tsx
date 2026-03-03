'use client';

import { Title, Text, Group, Button, Grid, Paper } from '@mantine/core';
import Editor from '@monaco-editor/react';

export default function PracticePage(): React.ReactNode {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <Group justify="space-between" mb="md">
        <div>
          <Title order={2} className="text-2xl font-bold mb-1 text-zinc-900 dark:text-zinc-50">
            Practice: React Hooks
          </Title>
          <Text c="dimmed" size="sm">
            Implement a custom useDebounce hook.
          </Text>
        </div>
        <Group>
          <Button variant="default">Ask AI Tutor</Button>
          <Button color="green">Submit Code</Button>
        </Group>
      </Group>

      <div className="flex-1 overflow-hidden">
        <Grid className="h-full m-0" gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }} className="h-full pb-0 pl-0">
            <Paper
              shadow="sm"
              p="md"
              radius="md"
              withBorder
              className="h-full bg-white dark:bg-zinc-900 overflow-y-auto"
            >
              <Title order={3} size="h5" mb="sm" className="text-zinc-900 dark:text-zinc-50">
                Instructions
              </Title>
              <Text size="sm" mb="md" className="text-zinc-700 dark:text-zinc-300">
                Create a custom hook called `useDebounce` that takes a value and a delay string. It
                should return the debounced value after the delay has passed.
              </Text>
              <Title order={4} size="sm" mb="xs" className="text-zinc-900 dark:text-zinc-50">
                Constraints
              </Title>
              <ul className="text-sm list-disc pl-4 text-zinc-600 dark:text-zinc-400">
                <li>
                  Use{' '}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">useState</code>{' '}
                  and{' '}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
                    useEffect
                  </code>
                  .
                </li>
                <li>Clear timeout on component unmount or value change.</li>
              </ul>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8 }} className="h-full pb-0 pr-0">
            <Paper
              shadow="sm"
              radius="md"
              withBorder
              className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800"
            >
              <Editor
                height="100%"
                defaultLanguage="typescript"
                theme="vs-dark"
                defaultValue={
                  "import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number): T {\n  // Implement here\n}"
                }
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'monospace',
                }}
              />
            </Paper>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
