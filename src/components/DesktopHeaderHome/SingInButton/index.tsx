import Link from 'next/link';
import { FiX } from 'react-icons/fi'
// import { signIn, signOut, useSession } from 'next-auth/client';

import { 
  Container
} from './styles';

export default function SingInButton() {
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
          <p>Sign in</p>
      </Link>
      </Container>
   );
}