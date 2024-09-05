import {Avatar, Container, Divider, Grid, Text} from "@mantine/core";

interface PostAtts {
  authorName: string;
  timestamp: { seconds: number; nanos: number };
  content: string;
  pfpUrl: string;
}

const PostBox: React.FC<PostAtts> = ({
  authorName,
  timestamp,
  pfpUrl,
  content,
}) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanos / 1000000);
  const currentdate = new Date();
  const istoday = date.toDateString() === currentdate.toDateString();
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const renderDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
  const renderTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date);
  
  const renderTimestamp = istoday ? `Today,  ${renderTime}` : `${renderDate}`;

  return (
    <Container fluid mx="2em" mb="1em" bg="black" p="1em" style={{borderRadius: "1em"}}>
        <Grid align="center" justify="space-between">
            <Grid.Col span={1}>
              <Avatar color="lime" variant="light" radius="lg"  src={pfpUrl} size="xl" component="a" href={`/profile/${authorName}`}/>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text variant="dimmed" component="a" href={`/profile/${authorName}`}>{authorName}</Text>
              <Text variant="dimmed">{renderTimestamp}</Text>
            </Grid.Col>
            <Divider orientation="vertical" size="md" />
            <Grid.Col span={9}>
            <Text>{content}</Text>
            </Grid.Col>
        </Grid>
    </Container>
  );
}

export default PostBox;