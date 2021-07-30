import { formatDistance } from 'date-fns';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMessage, AiOutlineUser } from 'react-icons/ai'
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { Modal } from '../../Modal';
import Input from '../../Forms/Input';
import { InputAutocomplete } from '../../Forms/InputAutocomplete';
import { Button } from '../../../components/Button';

import { 
  Container,
  NotificationWarn,
  DropDownDiv,
  DropDown,
  DropDownTitle,
  DropDownItems,
  DropDownItem,
  DropDownItemLefft,
  DropDownItemProfile,
  DropDownItemText,
  DropDownItemTextHasNotif,
  DropDownItemTextHasNotifBall,
  DropDownViewAll,
} from './styles';
import { useToast } from '../../../contexts/ToastContext';
import getValidationErrors from '../../../utils/getValidationErrors';
import { TextArea } from '../../TextArea';

interface IMessageMenu {
  dropdownOpen : boolean;
  refDropdown: ReactNode;
  openDropdown: (e?: Event) => void;
  closeDropdown: (e?: Event) => void;
}

interface IDataAutocomprete {
  id: string;
  description: string;
}

interface IMessageFormModal {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  viewed: boolean;
  createdAt: Date;
  distanceDate?: string;
}

export function MessageMenu({ dropdownOpen, refDropdown, openDropdown, closeDropdown}: IMessageMenu) {
  const [messages, setMessages] = useState([] as IMessageFormModal[]);
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal(): void {
    // closeDropdown();

    setModalOpen(!modalOpen);
  }
  
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const messages = [
      {
        user: {
          name: 'Vitor Bonet',
          avatar: null,
        },
        message: 'Hi, I like your music',
        createdAt: new Date('2021-05-15 23:00:00'),
        viewed: true,
      },
      {
        user: {
          name: 'Jhon Due',
          avatar: '/images/young-music.jpg',
        },
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed dapibus odio. Sed faucibus urna at pretium porta. Nulla porttitor scelerisque lectus nec aliquam. Mauris sit amet aliquam odio.',
        viewed: false,
        createdAt: new Date('2021-05-15 15:50:00'),
      },
    ] as IMessageFormModal[];

    messages.map(message => message.distanceDate = formatDistance(new Date(), message.createdAt));

    setMessages(messages);

  }, []);

  const handleSubmit = useCallback(
    async (data: IMessageFormModal) => {
      try {
        formRef.current?.setErrors({});
        console.log(data);

        const schema = Yup.object().shape({
          user: Yup.string().required("User required"),
          message: Yup.string().required("Password required")
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        addToast({
          type: "success",
          title: "Login success!",
          description: "Welcome to Cisum.Club",
        });

        // history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          console.log(err);
          addToast({
            type: "error",
            title: "Login error",
            description: "An error occurred, please try again.",
          });
        }
      }
    },
    // [addToast, history]
    [addToast]
  );

  return (
    <>
      <Container onClick={openDropdown}>
        <AiOutlineMessage/>
        { messages.length > 0 && (<NotificationWarn>{messages.length}</NotificationWarn> ) }
      </Container>

      <DropDownDiv ref={refDropdown}>
      {dropdownOpen && (
        <DropDown>
          <DropDownTitle>
            Messages
            <button type="button" onClick={toggleModal}>+ New Message</button>
          </DropDownTitle>

          <DropDownItems>
          {messages.map(message => (
            <DropDownItem key={message.id}>
              <DropDownItemLefft>
                <DropDownItemProfile>
                  { message.user.avatar ? (
                    <img src={message.user.avatar} alt={message.user?.name} />
                  ) : (
                    <AiOutlineUser />
                  ) }
                </DropDownItemProfile>
                <DropDownItemText>
                  {message.user?.name}
                  <p>{message.message}</p>
                  <p>{message.distanceDate}</p>
                </DropDownItemText>
              </DropDownItemLefft>
              <DropDownItemTextHasNotif>
              {message.viewed && (<DropDownItemTextHasNotifBall />)}
              </DropDownItemTextHasNotif>
            </DropDownItem>
          ))}
          </DropDownItems>

          <DropDownViewAll>
            VIEW ALL
          </DropDownViewAll>
        </DropDown>
      )}
      </DropDownDiv>

      <Modal title="Messages" isOpen={modalOpen} setIsOpen={toggleModal}>
        <Form ref={formRef} onSubmit={handleSubmit} style={{ padding: '0 3rem' }}>
          <InputAutocomplete 
            name="user" 
            label="User" 
            data={[{id: '1', description: 'Vitor Bonet'}, {id: '2', description: 'Anna Paula'}, {id: '3', description: 'Vinicius Bonet'}]}
          />
          <TextArea name="message" label="Message" />
          <Button type="submit">Send</Button>
        </Form>
      </Modal>
    </>
  );
}