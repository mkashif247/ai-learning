import { Card as MantineCard, CardProps as MantineCardProps, Text, Group } from '@mantine/core';

export interface CardProps extends MantineCardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children, ...props }: CardProps): React.ReactNode => {
  return (
    <MantineCard shadow="sm" padding="lg" radius="md" withBorder {...props}>
      {title && (
        <Group justify="space-between" mb="xs">
          <Text fw={600} size="lg">
            {title}
          </Text>
        </Group>
      )}
      {children}
    </MantineCard>
  );
};
