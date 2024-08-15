import { useState } from "react";
import { Container, Title, Text, Flex, Button, Avatar, Divider } from "@mantine/core";
import PostBox from "../components/PostBox.tsx";
import { IconBookmark, IconBookmarkFilled, IconPlus, IconX } from "@tabler/icons-react";
import AddPost from "../components/AddPost.tsx";

const saveicon = <IconBookmark />;
const savedicon = <IconBookmarkFilled />;
const addicon = <IconPlus />;
const   closeicon = <IconX />;

export default function Thread() {
  const [saved, setSaved] = useState(true);
  const [showAddPost, setShowAddPost] = useState(false);

  function handleSaving(): void {
    setSaved(!saved);
  }

  function toggleAddPost() {
    setShowAddPost(!showAddPost); 
  }

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
            component="a"
            href="/profile/username"
          />
          <Flex direction="column">
            <Text component="a" href="/profile/username">
              Nickname
            </Text>
            <Text>Timestamp</Text>
          </Flex>

          <Divider orientation="vertical" size="md" />
          <Title c="white">
            A Title for a thread that you probably don't care about with text just to check what
            happens when the text wraps
          </Title>

          <Flex direction="column" ml="auto">
            <Title>56</Title>
            <Text>posts</Text>
          </Flex>
        </Flex>

        <Flex direction="column" mt="3rem">
          <Text size="lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorum est, rem
            voluptate tempore culpa ipsa illum aliquam explicabo. Quaerat debitis dolore odit
            aperiam nostrum facilis sunt sit enim cupiditate? Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Laudantium in maiores dolorum cumque voluptatibus beatae
            distinctio, rem omnis eius temporibus, accusantium rerum delectus fuga optio consequatur
            placeat nihil eveniet? Ab?
          </Text>
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
          <Button variant="filled" color="teal" leftSection={showAddPost ? closeicon : addicon} onClick={toggleAddPost}>
            Add Post
          </Button>
        </Flex>

        {showAddPost && (
          <Container fluid mt="1em" p="md">
            <AddPost />
          </Container>
        )}
      </Container>

      <Container fluid>
        <PostBox />
        <PostBox />
        <PostBox />
        <PostBox />
        <PostBox />
      </Container>
    </>
  );
}
