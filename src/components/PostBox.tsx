import {Avatar, Container, Divider, Grid, Text, Group} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Post } from "../axios/postApi";

const renderTimestamp = (timestamp: { seconds: number; nanos: number } | undefined) => {
  var final = "Just now";
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

const PostBox: React.FC<Post> = (post:Post) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Container fluid mx={isMobile ? "1em" : "2em"} mb="1em" bg="black" p="1em" style={{borderRadius: "1em"}}>
        <Grid align="center" justify="space-between">
        {isMobile ? (
          <Grid.Col span={12}>
            <Group>
              <Avatar color="lime" variant="light" radius="lg" src={post.pfpUrl} size="sm" component="a" href={`/profile/${post.authorId}`} />
              <Text variant="dimmed" size="sm" component="a" href={`/profile/${post.authorId}`}>{post.authorName}</Text>
              <Text variant="dimmed" size="xs">{renderTimestamp(post.created)}</Text>
            </Group>
          </Grid.Col>
        ) : (
          <>
            <Grid.Col span={1}>
              <Avatar color="lime" variant="light" radius="lg" src={post.pfpUrl} size="xl" component="a" href={`/profile/${post.authorId}`} />
            </Grid.Col>
            <Grid.Col span={1}>
              <Text variant="dimmed" size="md" component="a" href={`/profile/${post.authorId}`}>{post.authorName}</Text>
              <Text variant="dimmed" size="sm">{renderTimestamp(post.created)}</Text>
            </Grid.Col>
            <Divider orientation="vertical" size="md" />
          </>
        )}
            <Grid.Col span={9}>
            <Text>{post.content}</Text>
            </Grid.Col>
        </Grid>
    </Container> 
  );
}

export default PostBox;