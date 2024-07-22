import { Avatar, Container, Divider, Flex } from "@mantine/core";


export default function BoxPreview() {
  return (
    <Container fluid style={{backgroundColor: "whitesmoke", margin: "2em", borderRadius: "1em"}}>
        <Flex gap="xl" direction="row" align="center" component="a" href="">
            <Avatar color="pink" variant="light" radius="lg" size="xl"/>
            <Flex direction="column">
                <p>Nickname</p>
                <p>Timestamp</p>
            </Flex>
            <Divider orientation="vertical" size="xl" />
            <h1>Title</h1>
        </Flex>
    </Container>
  );
}