import React, { useState } from 'react';
import { Container, Textarea, Button, Flex, Title, Notification } from '@mantine/core';

export default function AddPost(){
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); 

  const handleSubmit = async (event: React.FormEvent<EventTarget>): Promise<void> => {
    event.preventDefault();

    if (content.trim() === '') {
      setError('Post content cannot be empty');
      return;
    }
    setError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit post');
      }
      setSuccess(true);
      setContent('');
    } catch (err: any) {  
      setError('An unexpected error occurred');
    }
  };

  return (
    <Container fluid p="md" bg="black" m="3em" style={{borderRadius: "1em"}}>
      <Title order={2} mb="md">
        Create a Post
      </Title>
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Write your post here..."
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
          minRows={6}
          mb="md"
        />

        <Flex justify="flex-end">
          <Button type="submit" variant="filled" color="teal">
            Post
          </Button>
        </Flex>

        {error && (
          <Notification color="red" mt="md">
            {error}
          </Notification>
        )}

        {success && (
          <Notification color="green" mt="md">
            Posted successfully!
          </Notification>
        )}
      </form>
    </Container>
  );
};