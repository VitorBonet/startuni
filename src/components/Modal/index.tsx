import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai'

import ReactModal from 'react-modal';

import {
  ModalHeader,
  ModalHeaderTitle,
  ModalHeaderClose,
  ModalContent,
} from './styles';

interface IModalProps {
  type?: 'sm' | 'md' | 'lg';
  title: string;
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

export function Modal({ children, type, title, isOpen, setIsOpen }: IModalProps) {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  let width = '400px';
  switch (type) {
    case 'md':
      width = '600px';
      break;
    case 'lg':
      width = '800px';
      break;
  }

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          background: 'var(--gray-800)',
          color: '#000000',
          borderRadius: '8px',
          width,
          border: 'none',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      
      <ModalHeader type={type}>
        <ModalHeaderTitle>{title}</ModalHeaderTitle>
          <ModalHeaderClose onClick={setIsOpen} ><AiOutlineClose /></ModalHeaderClose>
        </ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
    </ReactModal>
  );
};
