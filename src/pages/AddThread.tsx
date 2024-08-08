// src/components/NewThreadForm.tsx

import React, { useState } from 'react';
import {Textarea, Button, Group, Select, Container } from '@mantine/core';
import axios from 'axios';

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
  const [content, setContent]= useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('/api/threads', { title, content, category });
      setTitle('');
      setContent('');
      setCategory('');
    } catch (error) {
      setError('Failed to create thread. Please try again.');
    }
  };

  return (
    <>
    <h1 style={{ marginLeft: "6rem"}}>Create a new Thread</h1>
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
