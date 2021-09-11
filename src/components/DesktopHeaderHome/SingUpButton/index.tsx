import { FiX } from 'react-icons/fi'
import Link from 'next/link';

import { 
  Container
} from './styles';

export function SingUpButton() {
  return ( 
      <Container 
       type="button"
     >
       <Link href={"/join"} >
        <p>Embarcar nesse foguete</p>
        </Link>
      </Container>
   );
}