import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Title, Text, Flex, Button, Avatar, Divider, Loader } from "@mantine/core";
import PostBox from "../components/PostBox.tsx";
import { IconBookmark, IconBookmarkFilled, IconPlus, IconX } from "@tabler/icons-react";
import AddPost from "../components/AddPost.tsx";
import { getThreadById } from "../threadApi";
import type { Thread } from "../threadApi"; 
import { getAllPosts } from "../postApi";
import type { Post } from "../postApi"; 

const saveicon = <IconBookmark />;
const savedicon = <IconBookmarkFilled />;
const addicon = <IconPlus />;
const closeicon = <IconX />;

const Thread: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [saved, setSaved] = useState(true);
  const [showAddPost, setShowAddPost] = useState(false);
  const [threadData, setThreadData] = useState<Thread | null>(null);
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedThread = await getThreadById(id!);
        setThreadData(fetchedThread);

        const fetchedPosts = await getAllPosts(id!);
        setPostsData(fetchedPosts);
      } catch (err) {
        setError('Failed to load data.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log(postsData);
  
  const handleSaving = () => setSaved(!saved);
  const toggleAddPost = () => setShowAddPost(!showAddPost);

  const renderCount = (count: number) => count.toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false });

  const renderTimestamp = (timestamp: { seconds: number; nanos: number }) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanos / 1000000);
    const currentdate = new Date();
    const istoday = date.toDateString() === currentdate.toDateString();
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    const renderDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
    const renderTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date);
   
    return istoday ? `Today, ${renderTime}` : `${renderDate}`;
  };


  if (loading) return <Loader variant="oval" size="md" color="teal" mx="4em" />
  if (error) return <div>{error}</div>;
  if (!threadData) return <div>Thread not found.</div>;

  const { authorName, created, pfpUrl, title, content, postCount } = threadData;


  return (
    <>
      <Container
        fluid
        mx="3em"
        mb="1em"
        mt="2em"
        style={{ backgroundColor: "black", borderRadius: "1em", padding: "1em" }}
      >
        <Flex gap="xl" direction="row" align="center" justify="space-between" mb="1rem">
          <Avatar
            color="pink"
            variant="light"
            radius="lg"
            size="xl"
            src={pfpUrl}
            component={Link}
            to={`/profile/${authorName}`}
          />
          <Flex direction="column">
            <Text variant="dimmed" component={Link} to={`/profile/${authorName}`}>{authorName}</Text>
            <Text variant="dimmed">{renderTimestamp(created)}</Text>
          </Flex>
          <Divider orientation="vertical" size="md" />
          <Title c="white">{title}</Title>
          <Flex direction="column" ml="auto">
            <Title>{renderCount(postCount)}</Title>
            <Text>posts</Text>
          </Flex>
        </Flex>

        <Flex direction="column" mt="3rem">
          <Text size="lg">{content}</Text>
        </Flex>
      </Container>

      <Container fluid mb="5em">
        <Flex direction="row" justify="flex-end" mr="2em">
          <Button
            variant="light"
            color="teal"
            mx="1em"
            leftSection={saved ? savedicon : saveicon}
            onClick={handleSaving}
          >
            {saved ? "Saved!" : "Save"}
          </Button>

          <Button
            variant="filled"
            color="teal"
            leftSection={showAddPost ? closeicon : addicon}
            onClick={toggleAddPost}
          >
            Add Post
          </Button>
        </Flex>

        {showAddPost && (
          <Container fluid mt="1em" p="md">
            <AddPost />
          </Container>
        )}
      </Container>

      <Container fluid>
        {postsData.length > 0 ? (
          postsData.map((post) => (
            <PostBox
              key={post.id}
              authorName={post.authorName}
              timestamp={post.created}
              content={post.content}
              pfpUrl={post.pfpUrl}
            />
          ))
        ) : (
          <Text>No posts yet:( Add one to start a conversation!</Text>
        )}
      </Container>
    </>
  );
};

export default Thread;
