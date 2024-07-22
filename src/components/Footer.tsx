import { Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandInstagram, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <p style={{color: "gray"}}>Created by Nilay</p>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}