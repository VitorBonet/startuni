import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface UploadProps {
  isDragActive: boolean;
  isDragReject: boolean;
  refKey?: string;
  [key: string]: any;
  type?: 'error' | 'success' | 'default';
}

const dragActive = css`
  border-color: var(--gray-100);
`;

const dragReject = css`
  border-color: #e83f5b;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 1.5px dashed var(--gray-300);
  border-radius: 5px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${(props: UploadProps): false | FlattenSimpleInterpolation =>
    props.isDragActive && dragActive}
  ${(props: UploadProps): false | FlattenSimpleInterpolation =>
    props.isDragReject && dragReject}
`;

const messageColors = {
  default: 'var(--gray-300)',
  error: '#e83f5b',
  success: '#12a454',
};

export const UploadMessage = styled.p`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 0;
  color: ${({ type }: UploadProps) => messageColors[type || 'default']};
  justify-content: center;
  align-items: center;
`;

export const DropzoneDiv = styled.div`
  border: 1px dashed var(--gray-700);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;