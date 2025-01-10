'use client'
import { useEffect, useState } from 'react';
import {
  IconMusic,
} from '@tabler/icons-react';
import {
  
  Card,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
} from '@mantine/core';
import classes from './ActionsGrid.module.css';

export default function Playlists() {
  const [playlists, setPlaylists] = useState({
    playlists: [],
    accessToken: ''
  });

  useEffect(() => {
    async function fetchPlaylists() {
      const res = await fetch('/api/UsersPlaylist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Đảm bảo cookies được gửi đi
      });
      const data = await res.json();
      console.log(data);

      setPlaylists({
        playlists: data.playlists || [],
        accessToken: data.access_token || ''
      });
    }

    fetchPlaylists();
  }, []);

  const items = playlists.playlists.map((item: any) => (
    <UnstyledButton  
      key={item.id} 
      className={classes.item}
      onClick={() => {
        // Truyền tất cả thông tin qua URL
        window.location.href = `http://localhost:8888/nameSpotify?id=${item.id}&name=${item.name}`;
      }}
    >
      <IconMusic size={32} />
      <Text size="xs" mt={7}>
        ID: {item.id}
      </Text>
      <Text size="xs" mt={7}>
        Name List: {item.name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card  className={classes.card} h="100vh">
    

      <Group justify="center" >
        <Text className={classes.title}>Playlist</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    
    </Card>
  );
}

