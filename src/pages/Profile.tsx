import { Container, Title, Text, Image, Flex, Badge, Button} from "@mantine/core";;
import placeholderImage from '../assets/cats-fashion.jpg'

export default function Profile() {
  return (
    <>
      <Container fluid bg="gray" m="4em" p="3em" style={{ borderRadius: "1em" }}>
      <Flex direction={{ base: 'column', sm: 'row' }} m="2em" gap="lg" align="center">
        <Image m="1em" h={275} w={275} src={placeholderImage} fallbackSrc="" fit="cover"/>
        <Flex direction="column" justify="center">
          <Title c="white">Name</Title>
          <Text c="gray" mb="0.5em">username</Text>
          <Badge c="teal" mb="0.5em">Member since [date]</Badge>
          <Text c="white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam tenetur earum at debitis natus cupiditate inventore, id obcaecati, libero voluptatum aliquid laboriosam? Laudantium voluptatem nemo quo quas sequi. Repellendus, ipsa.</Text>
        </Flex>
      </Flex>
    </Container>
    </>
  );
}
