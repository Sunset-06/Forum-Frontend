import {Avatar, Button, Container, Divider, Flex, Grid, Text} from "@mantine/core";


export default function PostBox() {
  return (
    <Container fluid mx="2em" mb="1em" style={{backgroundColor: "black", borderRadius: "1em", padding: "1em"}}>
        <Grid align="center" justify="space-between">
            <Grid.Col span={1}>
              <Avatar color="lime" variant="light" radius="lg" size="xl" component="a" href="/userid"/>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text variant="dimmed" component="a" href="/userid">Nickname</Text>
              <Text variant="dimmed">Timestamp</Text>
            </Grid.Col>
            <Divider orientation="vertical" size="md" />
            <Grid.Col span={9}>
            <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In cupiditate quis earum commodi, fuga ratione autem iusto ea velit error nobis laboriosam tempore veritatis quidem magni inventore, facilis quibusdam rerum.</Text>
            </Grid.Col>
        </Grid>
    </Container>
  );
}