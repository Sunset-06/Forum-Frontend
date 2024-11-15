import { Avatar, Container, Divider, Flex, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

interface ThreadAtts {
  id: string;
  authorName: string;
  timestamp?: { seconds: number; nanos: number };
  pfpUrl: string;
  title: string;
  content: string;
  postCount: number;
}

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

const ThreadBox: React.FC<ThreadAtts> = ({
  id,
  authorName,
  timestamp,
  pfpUrl,
  title,
  content,
  postCount,
}) => {
    const renderCount = postCount.toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false });    

  return (
    <Container fluid bg="black" m="3em" p="1em" style={{borderRadius: "1em"}}>
        <Flex gap="xl" direction="row" align="center" justify="space-between">
            <Avatar color="pink" variant="light" radius="lg" size="xl" component="a" href={`/profile/${authorName}`} src={pfpUrl} />
            <Flex direction="column">
                <Text variant="dimmed" component="a" href={`/profile/${authorName}`}>{authorName}</Text>
                <Text variant="dimmed">{renderTimestamp(timestamp)}</Text>
            </Flex>
  
            <Divider orientation="vertical" size="md" />
            <Flex component={Link} to={`/thread/${id}`} state={{ authorName, timestamp, pfpUrl, title, content, postCount }} td="none"> 
              <Title c="white">{title}</Title>
            </Flex>

            <Flex direction="column" ml="auto">
              <Title>{renderCount}</Title>
              <Text>posts</Text>
            </Flex>
        </Flex>
    </Container>
  );
}

export default ThreadBox