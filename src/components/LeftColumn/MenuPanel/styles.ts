import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export const Container = styled.div`
  position: sticky;
  top: 64px;

  > div {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 600;
    padding: 8px 12px 16px;

    .title {
      color: var(--red-700);
      margin-bottom: 10px;
    }
  }
`;

export const MenuItem = styled.div`
  color: var(--gray-100);
  display: flex;
  align-items: center;
  padding: 0.275rem 0;
  cursor: pointer;

  & + span {
    margin-top: 0.5rem;
  }

  &:hover {
    border-left: 2px solid var(--red-700);
    padding-left: 0.5rem;
  }
`;

export const Item = styled.div`
  text-align: center;

  & + div {
    margin-top: 2rem;
  }
`;

export const SocialMidiaDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const SocialMidiaItem = styled.div`
  height: 1.8rem;
  width: 1.8rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  color: var(--gray-300);
  background-color: var(--gray-700);
`;

export const Facebook = styled(FaFacebookF)``;

export const Twitter = styled(FaTwitter)``;

export const Instagram = styled(FaInstagram)``;

export const Linkedin = styled(FaLinkedinIn)``;

export const TermsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  color: var(--gray-700);
  transition: color 2s;

  a:hover {
    color: var(--red-500);
  }
`;

