import {Avatar, Button, Container, Divider, Flex, Grid, Text} from "@mantine/core";
import { IconBlockquote } from "@tabler/icons-react";
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

const handleQuote = () => {
  
};


const PostBox: React.FC<Post> = (post:Post) => {
  return (
    <Container fluid mx="2em" mb="1em" bg="black" p="1em" style={{borderRadius: "1em"}}>
        <Grid align="center" justify="space-between">
            <Grid.Col span={1}>
              <Avatar color="lime" variant="light" radius="lg"  src={post.pfpUrl} size="xl" component="a" href={`/profile/${post.authorId}`}/>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text variant="dimmed" component="a" href={`/profile/${post.authorId}`}>{post.authorName}</Text>
              <Text variant="dimmed">{renderTimestamp(post.created)}</Text>
            </Grid.Col>
            <Divider orientation="vertical" size="md" />
            <Grid.Col span={9}>
            <Text>{post.content}</Text>
            </Grid.Col>
            <Button size={"xs"} variant="subtle" color="teal" bd="none" onClick={handleQuote}>
              <IconBlockquote/>
            </Button>
        </Grid>
    </Container> 
  );
}

export default PostBox;