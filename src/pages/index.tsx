import Head from 'next/head'
import React from 'react';
import { GetStaticProps } from 'next';

import { 
  Container, 
  PrincipalSection,
  PrincipalSectionDegrade,
  PrincipalSectionDegradeHorizontal,
  PrincipalSectionDegradeHorizontalTitle,
  PrincipalSectionDegradeHorizontalText,
  SecondSection,
  Footer,
  FooterContent,
  FooterContentText,
  FooterItem,
  FooterTitle,
  FooterText,
  FooterContentSepartor,
  FooterContentMidia,
  FooterContentMidiaText,
  FooterContentMidiaItens,
  SocialMidiaDiv,
  SocialMidiaItem,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from '../styles/styles';
import { DesktopHeaderHome } from '../components/DesktopHeaderHome';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Welcome | StartUni</title>
      </Head>
      <main>
        <Container>
          <DesktopHeaderHome backHeaderAndIcon={true}/>

          <PrincipalSection>
              <PrincipalSectionDegrade>
                <PrincipalSectionDegradeHorizontal>
                  <PrincipalSectionDegradeHorizontalTitle>
                    <span>Start</span><div className="marginDiv" >Up</div><span>Uni</span><div>verse</div>
                  </PrincipalSectionDegradeHorizontalTitle>
                  <PrincipalSectionDegradeHorizontalText>
                    <p>Não fique de fora dessa! Um universo rico em inovação e properidade, conheça novas tecnologias, novas ideias e novas possibilidades</p>
                  </PrincipalSectionDegradeHorizontalText>
                </PrincipalSectionDegradeHorizontal>
              </PrincipalSectionDegrade>
              <img src="/images/Startup_SVG.svg" alt="Startup" />
          </PrincipalSection>

          <SecondSection>
          </SecondSection>

          <Footer>
            <FooterContent>
              <FooterContentText>
                <FooterItem>
                  <FooterTitle>ABOUT</FooterTitle>
                  <FooterText>Lorem ipsum dolor sit amet. A perferendis sint ex consequatur facere et iste quia et cupiditate repellendus! 
                    In cupiditate voluptates eos alias labore ea quaerat necessitatibus ab omnis animi hic dolorem quaerat est nesciunt 
                    placeat vel perferendis quia. Et totam quia est enim minima ut adipisci commodi est magni deserunt!</FooterText>
                </FooterItem>
                <FooterItem>
                  <FooterTitle>QUICK LINKS</FooterTitle>
                  <FooterText>About | Terms of use | Privacy | Disclaimer</FooterText>
                </FooterItem>
              </FooterContentText>
              <FooterContentSepartor />
              <FooterContentMidia>
                <FooterContentMidiaText>Copyright © 2021 StartUni, All Rights Reserved.</FooterContentMidiaText>
                <FooterContentMidiaItens>
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
                </FooterContentMidiaItens>
              </FooterContentMidia>
            </FooterContent>
          </Footer>
        </Container>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 24 hrs 
  }
}