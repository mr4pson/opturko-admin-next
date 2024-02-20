import styled from 'styled-components';
import UploadSVG from '../../../assets/svg/upload.svg';
import { useDropzone } from 'react-dropzone';
import { TFormFieldProps } from '../../../common/types';
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import useConnectForm from '../useConnectForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

// TODO Настроить тип
// type UploadedFile = File & { path: string };

type Props = {
  label: string;
  description: string;
  hasSchema?: boolean;
  hasError?: boolean;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  meta?: FieldMetaProps<any>;
  type?: 'File' | 'Image';
  onChange?: (files: string) => void;
};
const FileUpload: React.FC<Props & TFormFieldProps> = ({
  hasError = false,
  hasSchema = false,
  label,
  description,
  field,
  form,
  type = 'Image',
  onChange,
}) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const [uploadedFile, setUploadedFile] = useState(
    form?.initialValues[field?.name!],
  );

  useConnectForm(uploadedFile, form, field, hasSchema, onChange);

  useEffect(() => {
    (async () => {
      const path = '/api/attachments/addAttachments';

      if (acceptedFiles?.length) {
        const formData = new FormData();

        formData.append('files', acceptedFiles[0]);

        const uploadFileResponse = await axios.post(path, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setUploadedFile(uploadFileResponse.data[0].fileName);
      }
    })();
  }, [acceptedFiles]);

  return (
    <FileUploadWrapper {...getRootProps()}>
      <ElementTitle>{label}</ElementTitle>
      <ElementDescription>{description}</ElementDescription>
      <FileInput {...getInputProps()} />
      <FileUploadSection hasError={hasError}>
        <FileUploadContent>
          <UploadSVG />
          <UploadAllowedTypes>
            {type === 'File' ? 'CSV. Max 1Gb.' : 'PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.'}
          </UploadAllowedTypes>
        </FileUploadContent>
        <FilesWrapper>
          {acceptedFiles.map((file: any) => (
            <FileItem key={file.path}>
              {file.path} - {file.size} bytes
            </FileItem>
          ))}
        </FilesWrapper>
      </FileUploadSection>
    </FileUploadWrapper>
  );
};

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ElementTitle = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #23262f;
`;

const ElementDescription = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #777e91;
  margin-top: 4px;
`;

const FileUploadSection = styled.div<{ hasError: boolean }>`
  width: 100%;
  min-height: 182px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f4f5f6;
  cursor: pointer;
  border-radius: 16px;
  margin-top: 16px;
  gap: 11px;
  border: ${(props) => (props.hasError ? '2px solid #ef466f' : 'none')};

  &:hover {
    background: rgba(244, 245, 246, 0.6);
  }
`;

const FileUploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 11px;
`;

const FileInput = styled.input``;

const UploadAllowedTypes = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #777e91;
`;

const FilesWrapper = styled.ul`
  list-style: none;
  padding: 0 20px;
  margin-bottom: -20px;
  margin-top: 0;
`;

const FileItem = styled.li`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #777e91;
`;

export default FileUpload;
