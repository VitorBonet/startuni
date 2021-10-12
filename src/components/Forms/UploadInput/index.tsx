import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from '@unform/core';
import PreviewImage from './PreviewImage';
import { BiImageAdd, BiFile } from 'react-icons/bi';

import { DropzoneDiv } from './styles';
interface Props {
  name: string;
  accept: string;
  title?: string;
  size: 'file' | 'icon';
  type: 'file' | 'image';
}
interface InputRefProps extends HTMLInputElement {
  acceptedFile: File;
}

export default function UploadInput({ name, accept, title, size, type }: Props) {
  const inputRef = useRef<InputRefProps>(null);
  const { fieldName, registerField, defaultValue = undefined } = useField(name);
  const [acceptedFile, setAcceptedFile] = useState<File>(defaultValue);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept,
    onDrop: onDropAcceptedFiles => {
      if (inputRef.current) {
        inputRef.current.acceptedFile = onDropAcceptedFiles[0];
        setAcceptedFile(onDropAcceptedFiles[0]);
      }
    },
  });
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputRefProps) => {
        return ref.acceptedFile;
      },
      clearValue: (ref: InputRefProps) => {
        ref.acceptedFile = undefined;
        setAcceptedFile(undefined);
      },
      setValue: (ref: InputRefProps, value) => {
        ref.acceptedFile = value;
        setAcceptedFile(value);
      },
    });
  }, [fieldName, registerField]);
  
  return (
    <>
      <DropzoneDiv className={size} {...getRootProps()} onClick={() => inputRef.current?.click()}>
        <input {...getInputProps()} accept={accept} ref={inputRef} />
        {isDragActive ? (
          <BiImageAdd size={30} />
        ) : 
          acceptedFile ? (<PreviewImage image={acceptedFile} />) : title ? title : 
          
          type === 'file' ? (<BiFile size={30} />) : (<BiImageAdd size={30} />)
        }
      </DropzoneDiv>    
    </>
  );
};