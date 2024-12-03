import { Title, Text, Flex, Container, Group, ActionIcon, rem } from "@mantine/core";
import { IconBrandInstagram, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import classes from './Footer.module.css';

export default function HomePage(){
    return(
        <>
          <Flex m="3em" direction="column" justify="space-between" align="flex-start" h="100%">
            <Title>Welcome to Forumeong!</Title>  
            <Text>This is a minor project that I am working on as I learn Spring-boot. </Text>
            <Text>Login using the button on the top right to be able to access the entire site. </Text>
            <Text>Once you've logged in, check out the categories page to see preexisting discussions, or click the button at the bottom of the sidebar to start your own!</Text>
            <Text>Be sure to check out the <a href="https://github.com/Sunset-06/Forumeong" target="_blank">GitHub repository</a> to learn more. Check out the bottom of this page for my contact info!</Text>
            <Text>Thanks for checking this site out :)</Text>
          </Flex>

          <div className={classes.footer}>
            <Container className={classes.inner}>
              <p style={{color: "gray"}}>Created by Nilay</p>
              <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
                <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://github.com/Sunset-06">
                  <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://www.linkedin.com/in/nilay06/">
                  <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://www.instagram.com/nilsy_05/">
                  <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
              </Group>
            </Container>
          </div>
        </>
    );
}