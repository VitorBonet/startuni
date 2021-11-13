import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  AiOutlineUser,
} from 'react-icons/ai';

import Panel from '../../Panel';

import { Container } from './styles';

interface IUserInfosPanelProps {
  infos: {
    startups: number;
    investiments: number;
    matchs: number;
  }
}

export function UserInfosPanel({ infos }: IUserInfosPanelProps) {
  const { user } = useAuth();
  
  return (
    <>
    <Panel>
      <Container>
        <div className="key-value">
          <span className="key">Startups</span>
          <span className="value">{ infos ? infos.startups : 0}</span>
        </div>
        <div className="key-value">
          <span className="key">Investimentos</span>
          <span className="value">{ infos ? infos.investiments : 0}</span>
        </div>
        <div className="key-value">
          <span className="key">Matchs</span>
          <span className="value">{ infos ? infos.matchs : 0}</span>
        </div>
      </Container>
    </Panel>

    
    <Panel>
      <Container>
        <div className="key-value">
          <span className="key">Sugestões de Matchs</span>
        </div>
      </Container>
    </Panel>
    </>
  );
};
