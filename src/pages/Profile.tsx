import {
  Container,
  Title,
  Text,
  Image,
  Flex,
  Badge,
  Loader,
  Button,
  Textarea,
  Input
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../axios/userApi.ts";
import type { User } from "../axios/userApi.ts";
import { useAuth } from "../auth/AuthContext.tsx";

export default function Profile() {
  const [showButtons, setShowButtons] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedBio, setUpdatedBio] = useState('');
  const [updatedPfp, setUpdatedPfp] = useState<File | null>(null);

  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedUser = await getUserById(id!);
        setUserData(fetchedUser);

        if (currentUser?.uid === id) {
          setShowButtons(true);
        }
        setUpdatedUsername(fetchedUser.username);
        setUpdatedBio(fetchedUser.bio || '');
      } catch (err) {
        setError('Failed to load the profile.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentUser]);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setUpdatedPfp(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = new FormData();
      updatedData.append('username', updatedUsername);
      updatedData.append('bio', updatedBio);
      if (updatedPfp) {
        updatedData.append('profilePicture', updatedPfp);
      }

      await updateUser(id!, updatedData);
      setEditing(false);
      setUserData((prevData) => {
        if (!prevData) return null;
        return {
          ...prevData,
          username: updatedUsername,
          bio: updatedBio,
          pfp: updatedPfp ? URL.createObjectURL(updatedPfp) : prevData.pfp,
        };
      });
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    }
  };

  if (loading) return <Flex align="center" justify="center" style={{width:'100vw'}}><Loader size="lg" /></Flex>;
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
          <div>
            <label htmlFor="profile-picture-input">
              <Image
                m="1em"
                h={275}
                w={275}
                src={updatedPfp ? URL.createObjectURL(updatedPfp) : userData.pfp}
                alt={`${userData.username}'s profile`}
                fit="cover"
                style={{ cursor: 'pointer' }}
                onError={(e) => {
                  e.currentTarget.src = "src/assets/def-pfp.png";
                }}
              />
            </label>
            {showButtons && (
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
              />
            )}
          </div>
          <Flex direction="column" justify="center">
            {editing ? (
              <>
                <Input
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsername(e.currentTarget.value)}
                  placeholder="Username"
                  required
                />
                <Textarea
                  value={updatedBio}
                  onChange={(e) => setUpdatedBio(e.currentTarget.value)}
                  placeholder="Bio"
                  required
                  autosize
                  minRows={3}
                  maxRows={10}
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
        <Container fluid mb="5em">
          <Flex direction="row" justify="flex-end" mr="2em">
            {editing ? (
              <>
                <Button variant="light" color="teal" mx="1em" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button variant="filled" color="teal" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="light" color="teal" mx="1em" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}
            <Button variant="filled" color="teal" onClick={() => { /* TODO: Logout Logic */ }}>
              Logout
            </Button>
          </Flex>
        </Container>
      )}
    </>
  );
}
