import { Container, Title, Text, Image, Flex } from "@mantine/core";

export default function Profile(){

    return(
        <>
          <Container fluid bg="gray" m="4em" h="30em" p="3em" style={{borderRadius: "1em"}}>
            <Flex direction="row" m="2em">
              <Flex direction="column">
                <Image m="1em" h={275} w={275} src="src/assets/cats-temp.jpeg" fallbackSrc=""/>
              </Flex>
            </Flex>
          </Container>
        </>
    );
}