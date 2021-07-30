import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  AiOutlineUser,
} from 'react-icons/ai';

import Panel from '../../Panel';

import { Container, AvatarIcon } from './styles';

export function ProfilePanel() {
  const { user } = useAuth();
  
  return (
    <Panel>
      <Container>
        <div className="profile-cover"></div>
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
        <h1>{user ? user.profileName: user.name}</h1>
        {/* <h2>Software Engineer @ WEG</h2> */}

        {/* <div className="separator"></div> */}

        {/* <div className="key-value">
          <span className="key">Quem viu seu perfil</span>
          <span className="value">1.558</span>
        </div>
        <div className="key-value">
          <span className="key">Viram sua publicação</span>
          <span className="value">388</span>
        </div> */}
      </Container>
    </Panel>
  );
};
