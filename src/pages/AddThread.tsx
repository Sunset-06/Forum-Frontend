import React, { useState } from 'react';
import { Textarea, Button, Group, Select, Container } from '@mantine/core';
import { useAuth } from '../auth/AuthContext.tsx';
import { createThread } from '../axios/threadApi';
import { Thread } from '../axios/threadApi';
import { useNavigate } from 'react-router-dom';

const cats = [
  { value: 'video-games', label: 'Video Games' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'books', label: 'Books' },
  { value: 'food', label: 'Food' },
  { value: 'movies', label: 'Movies' },
  { value: 'owners', label: 'Owners' },
  { value: 'travel', label: 'Travel' },
  { value: 'music', label: 'Music' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'sports', label: 'Sports' },
  { value: 'motorsports', label: 'Motorsports' },
];

export default function NewThreadForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentUser) {
      setError('You must be signed in to create a thread.');
      return;
    }

    const newThread: Thread = {
      id: '', 
      title,
      content,
      authorId: currentUser.id,
      authorName: currentUser.username,
      pfpUrl: currentUser.pfp,
      postCount: 0,
      category,
    };

    try {
      const responseId= await createThread(newThread);

      setTitle('');
      setContent('');
      setCategory('');
      navigate(`/thread/${responseId}`);   
    } catch (error) {
      setError('Failed to create thread. Please try again.');
    }
  };

  return (
    <>
      <h1 style={{ marginLeft: "6rem" }}>Create a new Thread</h1>
      <Container fluid mx="4em" my="4em" bg="black" p="lg">
        <form onSubmit={handleSubmit}>
          <Textarea
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            required
            autosize
            maxRows={2}
          />
          <Textarea
            label="Content"
            value={content}
            onChange={(event) => setContent(event.currentTarget.value)}
            required
            autosize
            minRows={3}
            maxRows={10}
          />
          <Select
            label="Category"
            placeholder="Choose a category"
            data={cats}
            value={category}
            onChange={setCategory}
            required
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Group mt="md">
            <Button type="submit" color='teal'>Create Thread</Button>
          </Group>
        </form>
      </Container>
    </>
  );
}
