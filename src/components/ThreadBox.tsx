import { Avatar, Container, Divider, Flex, Text, Title } from "@mantine/core";

interface ThreadAtts {
  username: string;
  timestamp: string;
  pfpUrl: string;
  title: string;
  posts: number;
}


const ThreadBox: React.FC<ThreadAtts> = ({
  username,
  timestamp,
  pfpUrl,
  title,
  posts,
}) => {
  return (
    <Container fluid bg="black" m="3em" p="1em" style={{borderRadius: "1em"}}>
        <Flex gap="xl" direction="row" align="center" justify="space-between">

            <Avatar color="pink" variant="light" radius="lg" size="xl" component="a" href="/profile/username" src={pfpUrl} />
            <Flex direction="column">
                <Text variant="dimmed" component="a" href="/profile/username">{username}</Text>
                <Text variant="dimmed">{timestamp}</Text>
            </Flex>
  
            <Divider orientation="vertical" size="md" />
            <Flex component="a" href="/thread/:id"> 
              <Title c="white">{title}</Title>
            </Flex>

            <Flex direction="column" ml="auto">
              <Title>{posts}</Title>
              <Text>posts</Text>
            </Flex>
        </Flex>
    </Container>
  );
}

export default ThreadBox