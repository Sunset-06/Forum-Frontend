// src/pages/CategoryPage.tsx

import { useState, useEffect } from 'react';
import ThreadBox from '../components/ThreadBox';
import { Title, Loader } from '@mantine/core';
import { getAllThreads, Thread } from '../threadApi';

function catTitle(url: string): string {
  const name = url.split('/').pop()?.split('.')[0] || '';
  const first = name.charAt(0).toUpperCase();
  return first + name.slice(1);
}

export default function Category() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categoryName = catTitle(window.location.href);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedThreads = await getAllThreads();
        
        const categoryThreads = fetchedThreads.filter((thread) => {
            return thread.cat === categoryName.toLowerCase();
          });
        setThreads(categoryThreads);
      } catch (error) {
        setError('Failed to load threads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <>
      <Title mx="2em" my="2em">
        Category: {categoryName}
      </Title>
      {loading ? (
        <Loader variant="oval" size="md" color="teal" />
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        threads.map((thread) => (
          <ThreadBox
            key={thread.id} 
            username={thread.authorId}
            timestamp={thread.createdAt}
            pfpUrl={thread.pfpUrl || ''}
            title={thread.title}
            posts={thread.posts}
          />
        ))
      )}
    </>
  );
}
