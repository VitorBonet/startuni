import React from 'react';
import Link from 'next/link';

import Panel from '../../Panel';
import { NewslatterSubscribe } from '../../NewslatterSubscribe';

import { 
  Container, 
  MenuItem,
  Item,
  SocialMidiaDiv,
  SocialMidiaItem,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  TermsDiv,
} from './styles';

export default function MenuPanel() {
  return (
    <Container>
      <Panel>
        {/* <span className="title">Hashtags</span> */}

        <Link href="/">
          <MenuItem>Library</MenuItem>
        </Link>
        <Link href="/">
          <MenuItem>Events</MenuItem>
        </Link>
      </Panel>

      <Panel>
        <Item>
          <NewslatterSubscribe />
        </Item>

        <Item>
          <SocialMidiaDiv>
            <SocialMidiaItem>
              <Facebook />
            </SocialMidiaItem>
            
            <SocialMidiaItem>
              <Twitter />
            </SocialMidiaItem>

            <SocialMidiaItem>
              <Instagram />
            </SocialMidiaItem>

            <SocialMidiaItem>
              <Linkedin />
            </SocialMidiaItem>
          </SocialMidiaDiv>
          <TermsDiv>
            <p>
              <a href="">About </a> | 
              <a href=""> Terms of use </a> |
              <a href=""> Privacy </a> | 
              <a href=""> Disclaimer </a>
            </p>
          </TermsDiv>
          <TermsDiv>
            <p>Copyright © 2020 Cisum.Club, All Rights Reserved.</p>
          </TermsDiv>
        </Item>
      </Panel>
    </Container>
  );
};
