import Link from 'next/link';
import { FiX } from 'react-icons/fi'
// import { signIn, signOut, useSession } from 'next-auth/client';

import { 
  Container
} from './styles';

interface INavButtonProps {
  text: string;
}

export default function NavButton({ text }: INavButtonProps) {
  // const [ session ] = useSession();
  const [ session ] = [0];

  return session ? (
    <Container 
     type="button"
   >
      Vitor Bonet
      <FiX 
        color="#737380" 
        // onClick={() => signOut()}
      />
    </Container>
    ) : ( 
      <Container 
       type="button"
     >
      <Link href={"/login"} >
          <p>{text}</p>
      </Link>
      </Container>
   );
}