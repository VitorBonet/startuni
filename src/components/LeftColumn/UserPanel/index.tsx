import React, { ChangeEvent, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  AiOutlineUser,
} from 'react-icons/ai';

import Panel from '../../Panel';

import { Container, AvatarIcon, AvatarIconImg } from './styles';
import { IUserDTOS } from '../../../dtos/IUserDTOS';
import { IInvestorsDTOS } from '../../../dtos/IInvestorsDTOS';
import { FiCamera } from 'react-icons/fi';
import { api } from '../../../services/apiClient';
import { useToast } from '../../../contexts/ToastContext';

interface IUserPanelProps {
  investor?: IInvestorsDTOS;
}

export function UserPanel({ investor }: IUserPanelProps) {
  const { updateUser } = useAuth();
  const auth = useAuth();
  const { addToast } = useToast();

  let user;
  if (investor) {
    user = investor.user;
  } else {
    user = auth.user;
  }

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        api.patch("/users/avatar", data).then((response) => {
          updateUser();

          addToast({
            type: "success",
            title: "Avatar atualizado!",
          });
        });
      }
    },
    [addToast, updateUser]
  );
  
  return (
    <Panel>
      <Container>
        { user?.avatarUrl ? (
          <AvatarIcon>
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className="profile-picture"
          />
          
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
          </AvatarIcon>
        ) : (
          <AvatarIcon>
            <AiOutlineUser size={30} />
            
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarIcon>
        ) }
        <h1>{user?.name}</h1>
        <h2>Aspirante</h2>

        <h2>{investor ? `${investor.city.name} - ${investor.state.code}, ${investor.country.name}` : 'Joinville - SC, Brasil'}</h2>
      </Container>
    </Panel>
  );
};
