import React, { useRef, useState } from 'react';
import router from 'next/router';
import { MessageMenu } from './MessageMenu';
import { NotificationMenu } from './NotificationMenu';
import { ProfileMenu } from './ProfileMenu';

import { 
  Container, 
  Wrapper, 
  Logo, 
  HomeIcon, 
  NotificationIcon, 
} from './styles';

function DesktopHeader() {
  const dropdownMessagesMenuRef = useRef<HTMLDivElement>(null);
  const dropdownNotificationMenuRef = useRef<HTMLDivElement>(null);
  const dropdownProfileMenuRef = useRef<HTMLDivElement>(null);
  const [dropdownMessagesOpen, setDropdownMessagesOpen] = useState(false);
  const [dropdownNotificationsOpen, setDropdownNotificationsOpen] = useState(false);
  const [dropdownProfileOpen, setDropdownProfileOpen] = useState(false);

  function openDropdownMessages() {
    setDropdownMessagesOpen(true);
    document.addEventListener('mousedown', closeDropdownMessages);
  }

  function closeDropdownMessages(event) {
    if (dropdownMessagesMenuRef.current && !dropdownMessagesMenuRef.current.contains(event.target)) {
      setDropdownMessagesOpen(false);
      document.removeEventListener('mousedown', closeDropdownMessages);
    }
  }

  function openDropdownNotifications() {
    setDropdownNotificationsOpen(true);
    document.addEventListener('mousedown', closeDropdownNotifications);
  }

  function closeDropdownNotifications(event) {
    if (dropdownNotificationMenuRef.current && !dropdownNotificationMenuRef.current.contains(event.target)) {
      setDropdownNotificationsOpen(false);
      document.removeEventListener('mousedown', closeDropdownNotifications);
    }
  }

  function openDropdownProfile() {
    setDropdownProfileOpen(true);
    document.addEventListener('mousedown', closeDropdownProfile);
  }

  function closeDropdownProfile(event) {
    if (dropdownProfileMenuRef.current && !dropdownProfileMenuRef.current.contains(event.target)) {
      setDropdownProfileOpen(false);
      document.removeEventListener('mousedown', closeDropdownProfile);
    }
  }

  return (
    <Container>
      <Wrapper>
        <div className="left" onClick={() => router.push('feed')} >
          <Logo src="/logoText.png" alt="startuni"/>
        </div>
        <div className="right">
          <nav>
              <MessageMenu dropdownOpen={dropdownMessagesOpen} openDropdown={openDropdownMessages} closeDropdown={closeDropdownMessages} refDropdown={dropdownMessagesMenuRef} />
              <NotificationMenu dropdownOpen={dropdownNotificationsOpen} openDropdown={openDropdownNotifications} refDropdown={dropdownNotificationMenuRef} />
              <ProfileMenu dropdownOpen={dropdownProfileOpen} openDropdown={openDropdownProfile} refDropdown={dropdownProfileMenuRef}/>
          </nav>
        </div>
      </Wrapper>
    </Container>
  );
}

export default DesktopHeader;