import { Avatar, Container, Divider, Flex, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { Thread } from "../axios/threadApi";

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

const ThreadBox: React.FC<Thread> = (thread:Thread) => {
    const renderCount = thread.postCount.toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false });    
    const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Container fluid bg="black" m="2em" p="1.5em" style={{ borderRadius: "1em" }}>
        <Flex gap="md" direction={isMobile ? "column" : "row"} align={isMobile ? "flex-start" : "center"} justify="space-between" wrap="wrap">
            <Flex align="center" gap="sm">
                <Avatar color="pink" variant="light" radius="lg" size={isMobile ? "md" : "xl"} component="a" href={`/profile/${thread.authorId}`} src={thread.pfpUrl} />
                <Flex direction="column" align={"flex-start"}>
                    <Text variant="dimmed" component="a" href={`/profile/${thread.authorId}`} size={isMobile ? "xs" : "md"}> {thread.authorName} </Text>
                    <Text variant="dimmed" size={isMobile ? "xs" : "sm"}> {renderTimestamp(thread.created)} </Text>
                </Flex>
            </Flex>
  
                {!isMobile && <Divider orientation="vertical" size="md" />}
            <Flex component={Link} to={`/thread/${thread.id}`} direction="column" align="flex-start" justify={"center"} style={{ flex: 1, textAlign: "left" }}>
                    <Title c="white" size={isMobile ? "md" : "22px"}>{thread.title}</Title>
            </Flex>

            <Flex direction="column">
              <Title size={isMobile ? "md" : "30px"}>{renderCount}</Title>
              <Text size={isMobile ? "sm" : "md"}>posts</Text>
            </Flex>
        </Flex>
    </Container>
  );
};

export default ThreadBox