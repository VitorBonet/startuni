import { ReactNode, useEffect, useState } from 'react';
import { AiOutlineBell, AiOutlineUser, AiOutlineLike } from 'react-icons/ai'
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { IoIosRocket } from 'react-icons/io';
import { formatDistance } from 'date-fns';
import { useQuery } from 'react-query';

import { 
  Container,
  NotificationWarn,
  DropDownDiv,
  DropDown,
  DropDownTitle,
  DropDownItems,
  DropDownItem,
  DropDownItemLefft,
  DropDownItemIcon,
  DropDownItemText,
  DropDownItemTextHasNotif,
  DropDownItemTextHasNotifBall,
  DropDownViewAll,
} from './styles';
import { api } from '../../../services/apiClient';
import { useRouter } from 'next/router';

interface INotificationMenu {
  dropdownOpen : boolean;
  refDropdown: ReactNode;
  openDropdown: (e: Event) => void;
}

interface INotification {
  id: string;
  code: string;
  message: string;
  link?: string;
  sender: {
    name: string;
  };
  startup: {
    id: string;
    name: string;
  }
  read: boolean;
  createdAt: Date;
  distanceDate: string;
}

export function NotificationMenu({ dropdownOpen, refDropdown, openDropdown }: INotificationMenu) {
  const router = useRouter();
  const [notifications, setNotifications] = useState([] as INotification[]);

  const { data, status } = useQuery('notifications', async () => {
    const response = await api.get<INotification[]>(`/notifications`, {
      params: {
        read: false,
      },
    });
    console.log(response.data);
    setNotifications(response.data);
    return response.data;
  }, {staleTime: 5000, cacheTime: 10})

  // useEffect(() => {
  //   setNotifications([ 
  //     { id: '1', code: 'startups', message: 'solicitou um Match com sua Startup', sender: { name: 'Rodrigo Issense'}, read: false, createdAt: new Date(), distanceDate: '3 min atrás' },
  //     { id: '1', code: 'likes', message: 'curtiu sua publicação', sender: { name: 'Rodrigo Issense'}, read: false, createdAt: new Date(), distanceDate: '10 min atrás' }
  //   ]);
  // }, []);

  function handleMarkAll() {
    const notificationItems = notifications;
    notificationItems?.map(notification => {
      try {
        api.post(`/notifications/${notification.id}`)
        .then((response) => {
          notification.read = true;
        });        
      } catch (error) {
        
      }
    });

    setNotifications([...notificationItems]);
  }

  function handleClickNotification(notification: INotification) {
      try {
        api.post(`/notifications/${notification.id}`)
        .then((response) => {
          notification.read = true;
          let newNotifications = notifications;
          newNotifications.map(notif => { if(notif.id === notification.id){ notif.read = true; } })
          setNotifications([...newNotifications]);  
        });            
      } catch (error) {
      }    

      if(notification.link) {
        router.push(notification.link);
      }
  }

  let message = '';

  return (
    <>
      <Container onClick={openDropdown} >
        <AiOutlineBell/>
        { notifications.length > 0 && (<NotificationWarn>{notifications.filter(notification => notification.read === false)?.length}</NotificationWarn> ) }
      </Container>

      <DropDownDiv ref={refDropdown}>
        {dropdownOpen && (
          <DropDown>
            <DropDownTitle>
              Notifications
              <p onClick={handleMarkAll}>MARCAR TODAS COMO LIDA</p>
            </DropDownTitle>

            <DropDownItems>
            {notifications.map(notification => (
              <DropDownItem key={notification.id} onClick={() => handleClickNotification(notification)}>
                <DropDownItemLefft>
                  <DropDownItemIcon>
                    { notification.code.split('.')[0] === 'users' && <AiOutlineUser /> }
                    { notification.code.split('.')[0] === 'posts' && <BsMusicNoteBeamed /> }
                    { notification.code.split('.')[0] === 'info' && <FiAlertCircle /> }
                    { notification.code.split('.')[0] === 'likes' && <AiOutlineLike /> }
                    { notification.code.split('.')[0] === 'startups' && <IoIosRocket /> }
                    { notification.code.split('.')[0] === 'matchs' && <IoIosRocket /> }
                    { notification.code.split('.')[0] === 'matchs_response_startup' && <IoIosRocket /> }
                    
                  </DropDownItemIcon>
                  <DropDownItemText>

                    { notification.code.split('.')[0] === 'matchs_response_startup' ? (
                      <>{notification?.startup.name} {notification.message}</>
                    ) : (
                      <>{notification?.sender.name} {notification.message}</>
                    )}

                    <p>{notification.distanceDate}</p>
                  </DropDownItemText>
                  </DropDownItemLefft>
                <DropDownItemTextHasNotif>
                {!notification.read && (<DropDownItemTextHasNotifBall />)}
                </DropDownItemTextHasNotif>
              </DropDownItem>
            ))}
            </DropDownItems>

            <DropDownViewAll>
              <AiOutlineArrowDown /> Ver Todos
            </DropDownViewAll>
          </DropDown>
        )}
      </DropDownDiv>
    </>
  );
}