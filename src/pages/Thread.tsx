import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Title, Text, Textarea, Flex, Button, Avatar, Divider, Loader } from "@mantine/core";
import { useAuth } from "../auth/AuthContext.tsx";
import PostBox from "../components/PostBox.tsx";
import { IconBookmark, IconBookmarkFilled, IconPlus, IconX } from "@tabler/icons-react";
import { getThreadById } from "../axios/threadApi.ts";
import type { Thread } from "../axios/threadApi.ts"; 
import { getAllPosts, createPost } from "../axios/postApi.ts";
import type { Post } from "../axios/postApi.ts"; 

const saveicon = <IconBookmark />;
const savedicon = <IconBookmarkFilled />;
const addicon = <IconPlus />;
const closeicon = <IconX />;

const Thread: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [saved, setSaved] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [threadData, setThreadData] = useState<Thread | null>(null);
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [newContent, setNewContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);

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

  //for adding a new post
  const handlePosting = async () => {
    if (newContent.trim() === '') {
      setPostError('Post content cannot be empty!');
      return;
    }

    const newPost: Post = {
      id: '',
      authorId: currentUser.id,
      authorName: currentUser.username, 
      content: newContent,
      pfpUrl: currentUser.pfpUrl,
    };

    try {
      await createPost(id!, newPost);
      setPostsData((prev) => [...prev, newPost]); 
      setNewContent('');
      toggleAddPost(); 
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post.');
    }
  };
 
  const handleSaving = () => setSaved(!saved);
  const toggleAddPost = () => setShowAddPost(!showAddPost);

  const renderCount = (count: number) => count.toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false });

  const renderTimestamp = (timestamp: { seconds: number; nanos: number } | undefined) => {
    var final = "date unknown";
    if(timestamp!=undefined){
      const date = new Date(timestamp.seconds * 1000 + timestamp.nanos / 1000000);
      const currentdate = new Date();
      const istoday = date.toDateString() === currentdate.toDateString();
      const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
      const renderDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
      const renderTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date);
      final = istoday ? `Today, ${renderTime}` : `${renderDate}`;
    }
    return final;
};


  if (loading) return <Loader variant="oval" size="md" color="teal" mx="4em" />
  if (error) return <div>{error}</div>;
  if (!threadData) return <div>Thread not found.</div>;

  const { authorId, authorName, created, pfpUrl, title, content, postCount } = threadData;


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
            to={`/profile/${authorId}`}
          />
          <Flex direction="column">
            <Text variant="dimmed" component={Link} to={`/profile/${authorId}`}>{authorName}</Text>
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
            <Container fluid p="md" bg="black" m="3em" style={{borderRadius: "1em"}}>
              <Title order={2} mb="md">
                Create a Post
              </Title>
                <form>
                  <Textarea
                    placeholder="Write your post here..."
                    value={newContent}
                    onChange={(event) => setNewContent(event.currentTarget.value)}
                    minRows={6}
                    mb="md"
                  />

                  <Flex justify="flex-end">
                    <Button variant="filled" color="teal" onClick={handlePosting}>
                      Post
                    </Button>
                  </Flex>
                  {postError && <Text c="red" mt="md">{postError}</Text>}
                </form>
              </Container>
          </Container>
            )}
      </Container>

      <Container fluid>
        {postsData.length > 0 ? (
          postsData.map((post) => (
            <PostBox
              id={post.id}
              authorId={post.authorId}
              authorName={post.authorName}
              created={post.created}
              content={post.content}
              pfpUrl={post.pfpUrl}
            />
          ))
        ) : (
          <Text>No posts yet. Add one to start a conversation!</Text>
        )}
      </Container>
    </>
  );
};

export default Thread;
