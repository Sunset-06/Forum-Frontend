import { Container, Title, Text, Image, Flex, Badge, Loader, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../axios/userApi.ts";
import type { User } from "../axios/userApi.ts"; 
import { useAuth } from "../auth/AuthContext.tsx";

export default function Profile() {
  const [showButtons, setShowButtons] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedUser = await getUserById(id!);
        setUserData(fetchedUser);

        const currentUserId = currentUser.uid;
        if (currentUserId && currentUserId === id) {
          setShowButtons(true);
        }
      } catch (err) {
        setError('Failed to load the Profile.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loader size="lg" />;
  }

  if (error) {
    return (
      <Container>
        <Text c="red">{error}</Text>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <Text>No user data found.</Text>
      </Container>
    );
  }

  return (
    <>
      <Container fluid bg="gray" m="4em" p="3em" style={{ borderRadius: "1em" }}>
        <Flex direction={{ base: 'column', sm: 'row' }} m="2em" gap="lg" align="center">
          <Image m="1em" h={275} w={275} src={userData.pfp || ""} alt={`${userData.username}'s profile`} fit="cover" />
          <Flex direction="column" justify="center">
            <Title c="white">{userData.username}</Title>
            <Text c="gray" mb="0.5em">{userData.email}</Text>
            <Badge color="teal" mb="0.5em">Member since [Date]{/*TODO: Add a date here*/}</Badge>
            <Text c="white">{userData.bio || "No bio available."}</Text>
          </Flex>
        </Flex>
      </Container>

      {showButtons && (
        <Container fluid mb="5em">
          <Flex direction="row" justify="flex-end" mr="2em">
            <Button
              variant="light"
              color="teal"
              mx="1em"
              onClick={() => { /* TODO: Edit Logic */ }}
            >
              Edit Profile
            </Button>
            <Button
              variant="filled"
              color="teal"
              onClick={() => { /* TODO: Logout Logic*/ }}
            >
              Logout
            </Button>
          </Flex>
        </Container>
      )}
    </>
  );
}