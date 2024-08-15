import { Avatar, Container, Divider, Flex, Text, Title } from "@mantine/core";

interface ThreadAtts {
  authorName: string;
  timestamp: { seconds: number; nanos: number };
  pfpUrl: string;
  title: string;
  postCount: number;
}


const ThreadBox: React.FC<ThreadAtts> = ({
  authorName,
  timestamp,
  pfpUrl,
  title,
  postCount,
}) => {
  const renderCount = postCount.toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false });
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanos / 1000000);
    const currentdate = new Date();
    const istoday = date.toDateString() === currentdate.toDateString();
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    const renderDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
    const renderTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date);
    
    const renderTimestamp = istoday ? `${renderTime}` : `${renderDate}`;

  return (
    <Container fluid bg="black" m="3em" p="1em" style={{borderRadius: "1em"}}>
        <Flex gap="xl" direction="row" align="center" justify="space-between">

            <Avatar color="pink" variant="light" radius="lg" size="xl" component="a" href={`/profile/${authorName}`} src={pfpUrl} />
            <Flex direction="column">
                <Text variant="dimmed" component="a" href={`/profile/${authorName}`}>{authorName}</Text>
                <Text variant="dimmed">{renderTimestamp}</Text>
            </Flex>
  
            <Divider orientation="vertical" size="md" />
            <Flex component="a" href="/thread/:id"> 
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