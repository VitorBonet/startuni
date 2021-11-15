import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  AiOutlineUser,
} from 'react-icons/ai';

import Panel from '../../Panel';

import { Container, AvatarIcon } from './styles';
import { IUserDTOS } from '../../../dtos/IUserDTOS';
import { IInvestorsDTOS } from '../../../dtos/IInvestorsDTOS';

interface IUserPanelProps {
  investor?: IInvestorsDTOS;
}

export function UserPanel({ investor }: IUserPanelProps) {
  const auth = useAuth();

  let user;
  if (investor) {
    user = investor.user;
  } else {
    user = auth.user;
  }
  
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
        <h1>{user?.name}</h1>
        <h2>Aspirante</h2>

        <h2>{investor ? `${investor.city.name} - ${investor.state.code}, ${investor.country.name}` : 'Joinville - SC, Brasil'}</h2>
      </Container>
    </Panel>
  );
};
