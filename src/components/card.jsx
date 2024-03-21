import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function NoteCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
      {notes.map((note, inx) => (
          
          <div>
            <p>{note.title}</p>
            <p>{note.note_body}</p>
          </div>
  ))}
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}></Text>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
     
      </Card.Section>
    </Card>
  );
}
export default NoteCard;