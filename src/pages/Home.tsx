import { Title, Text, Flex } from "@mantine/core";

export default function HomePage(){
    return(
        <>
          <Flex m="3em" direction="column" justify="space-between" align="flex-start" h="100%">
            <Title>Welcome to Forumeong!</Title>  
            <Text>This is a minor project that I am working on as I learn Spring-boot. </Text>
            <Text>Login using the button on the top right to be able to access the entire site. </Text>
            <Text>Once you've logged in, check out the categories page to see preexisting discussions, or click the button at the bottom of the sidebar to start your own!</Text>
            <Text>Be sure to check out the <a href="https://github.com/Sunset-06/Forumeong" target="_blank">GitHub repository</a> to learn more. For contact info check out the footer.</Text>
            <Text>Thanks for checking this site out :)</Text>
          </Flex>
        </>
    );
}