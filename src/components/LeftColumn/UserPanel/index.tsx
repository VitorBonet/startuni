import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  AiOutlineUser,
} from 'react-icons/ai';

import Panel from '../../Panel';

import { Container, AvatarIcon } from './styles';

export function UserPanel() {
  const { user } = useAuth();
  
  return (
    <Panel>
      <Container>
        { user?.avatarUrl ? (
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className="profile-picture"
          />
        ) : (
          <AvatarIcon>
            <AiOutlineUser size={30} />
          </AvatarIcon>
        ) }
        <h1>{user ? user.profileName: user?.name} Vitor Bonet</h1>
        <h2>Aspirante</h2>

        <h2>Joinville - SC, Brasil</h2>
      </Container>
    </Panel>
  );
};
