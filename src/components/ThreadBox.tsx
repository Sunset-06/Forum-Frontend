import { Avatar, Container, Divider, Flex, Text, Title } from "@mantine/core";


export default function ThreadBox() {
  return (
    <Container fluid bg="black" m="3em" p="1em" style={{borderRadius: "1em"}}>
        <Flex gap="xl" direction="row" align="center" justify="space-between">

            <Avatar color="pink" variant="light" radius="lg" size="xl" component="a" href="/profile/username"/>
            <Flex direction="column">
                <Text variant="dimmed" component="a" href="/profile/username">Nickname</Text>
                <Text variant="dimmed">Timestamp</Text>
            </Flex>
  
            <Divider orientation="vertical" size="md" />
            <Flex component="a" href="/thread/:id"> 
              <Title c="white">An Example for a Thread</Title>
            </Flex>

            <Flex direction="column" ml="auto">
              <Title>56</Title>
              <Text>posts</Text>
            </Flex>
        </Flex>
    </Container>
  );
}