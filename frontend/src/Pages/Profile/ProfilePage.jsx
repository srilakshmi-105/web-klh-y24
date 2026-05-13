import React, { use } from 'react'
import Service from '../../utils/http';
import { Container, Stack } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { Text } from '@mantine/core';
import { useEffect } from 'react';
import { ColorSwatch, Group } from '@mantine/core';
import { Image } from '@mantine/core';

export const ProfilePage = () => {
    const service = new Service();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const fetchUser = async () => {
        try {
            const res = await service.get("user/me");
            console.log(res);
            setUser(res);
            setLoading(false);
        }
        catch (err) {
            console.error(err);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    if (!user) {
        return (
            <div>User not found</div>
        )
    }
    
    return (
        <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="md"
            >
                <Avatar src={user.avatar} alt="it's me"/>
                <Text> {user.name} </Text>
                <Text> {user.email} </Text>
                <Text>{new Date(user.createdAt).toLocaleDateString()}</Text>
               

    <Group>
     
      <ColorSwatch color="rgba(234, 22, 174, 0.5)" />
    
    </Group>


    <Image
      radius="md"
      h={50}
      w="auto"
      fit="contain"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
    />

            </Stack>
        </Container>
    )
}
