import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from '@unform/core';
import PreviewImage from './PreviewImage';

import { DropzoneDiv } from './styles';
import PreviewTrack from './PreviewTrack';
interface Props {
  name: string;
  accept: string;
  title: string;
  type: 'image' | 'video'
}
interface InputRefProps extends HTMLInputElement {
  acceptedFiles: File[];
}

export default function ReactDropzoneInput({ name, accept, title, type }: Props) {
  const inputRef = useRef<InputRefProps>(null);
  const { fieldName, registerField, defaultValue = [] } = useField(name);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>(defaultValue);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept,
    onDrop: onDropAcceptedFiles => {
      if (inputRef.current) {
        inputRef.current.acceptedFiles = onDropAcceptedFiles;
        setAcceptedFiles(onDropAcceptedFiles);
      }
    },
  });
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputRefProps) => {
        return ref.acceptedFiles || [];
      },
      clearValue: (ref: InputRefProps) => {
        ref.acceptedFiles = [];
        setAcceptedFiles([]);
      },
      setValue: (ref: InputRefProps, value) => {
        ref.acceptedFiles = value;
        setAcceptedFiles(value);
      },
    });
  }, [fieldName, registerField]);
  
  return (
    <>
    <DropzoneDiv {...getRootProps()} onClick={() => inputRef.current?.click()}>
      <input {...getInputProps()} accept={accept} ref={inputRef} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : title}
    </DropzoneDiv>
    
    { acceptedFiles?.map(file => type === 'image' ? ( <PreviewImage image={file} /> ) :  ( <PreviewTrack track={file} /> )) }
    
    </>
  );
};