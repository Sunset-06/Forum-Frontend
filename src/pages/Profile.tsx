import {
  Container,
  Title,
  Text,
  Image,
  Flex,
  Badge,
  Loader,
  Button,
  TextInput,
  Input,
  Textarea,
  Modal
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../axios/userApi.ts";
import type { User } from "../axios/userApi.ts";
import { logout } from "../auth/authFunctions.ts";
import { useAuth } from "../auth/AuthContext.tsx";

export default function Profile() {
  const [showButtons, setShowButtons] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //editing states
  const [editing, setEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [ConfirmationOpen, setConfirmationOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedUser = await getUserById(id!);
        setUserData(fetchedUser);

        if (currentUser?.id === id) {
          setShowButtons(true);
        }
        setUpdatedBio(fetchedUser.bio || '');
        setUpdatedUsername(fetchedUser.username || '');
      } catch (err) {
        setError('Failed to load the profile.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentUser]);

  const handleSave = async () => {
    try {
      const updatedData = {
        username: updatedUsername,
        bio: updatedBio
      };

      await updateUser(id!, updatedData);

      setEditing(false);
      setUserData((prevData) => {
        if (!prevData) return null;
        return {
          ...prevData,
          username: updatedUsername,
          bio: updatedBio,
        };
      });
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    }
  };

  const handleLogout = async() =>{
    logout();
  };

  const handleConfirmEdit = () => {
    setConfirmationOpen(false);
    handleSave();
  };

  const handleCancelEdit = () => {
    setConfirmationOpen(false);
    setUpdatedUsername(currentUser.username)
    setUpdatedBio(currentUser.bio) 
    setEditing(false);
  };

  

  if (loading) return <Flex align="center" justify="center" style={{ width: '100vw' }}><Loader size="lg" /></Flex>;
  if (error) return <Container><Text c="red">{error}</Text></Container>;

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
          <Image m="1em" h={275} w={275} src={userData.pfp} alt={`${userData.username}'s profile picture`} fit="cover" />
          <Flex direction="column" justify="center">
            {editing ? (
              <>
                <Input.Label>Username</Input.Label>
                <TextInput
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsername(e.currentTarget.value)}
                  placeholder="username"
                  radius="md" 
                  size="lg" 
                />
                <Input.Label>Bio</Input.Label>
                <Textarea
                  value={updatedBio}
                  onChange={(e) => setUpdatedBio(e.currentTarget.value)}
                  placeholder="bio"
                  radius="md" 
                  size="lg" 
                />
              </>
            ) : (
              <>
                <Title c="white">{userData.username}</Title>
                <Text c="gray" mb="0.5em">{userData.email}</Text>
                <Badge color="teal" mb="0.5em">Member since [Date]</Badge>
                <Text c="white">{userData.bio || "No bio available."}</Text>
              </>
            )}
          </Flex>
        </Flex>
      </Container>

      {showButtons && (
        <Container fluid mb="2em">
          <Flex direction="row" justify="flex-end" mr="2em">
            {editing ? (
              <>
                <Button variant="light" color="teal" mx="1em" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button variant="filled" color="teal" onClick={()=> setConfirmationOpen(true)}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="light" color="teal" mx="1em" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}
            <Button variant="filled" color="red" mx={4} onClick={() => handleLogout()}>
              Logout
            </Button>
          </Flex>
        </Container>
      )}
      

      
      <Modal
        opened={ConfirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        title="Confirm Profile Changes"
      >
        <Text>Are you sure you want to save the changes to your profile?</Text>
        <Flex justify="flex-end" gap="1em" mt="1.5em">
          <Button variant="light" color="gray" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button variant="filled" color="teal" onClick={handleConfirmEdit}>
            Confirm
          </Button>
        </Flex>
      </Modal>
    </>
  );
}
