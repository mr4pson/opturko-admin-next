import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { PageTitle } from '../common';
import BreadCrumbs from '../ui-kit/Breadcrumbs';
import Button from '../ui-kit/Button';
import FileUpload from '../ui-kit/FileUpload';
import { uploadProducts } from '../../redux/slicers/productSlicer';
import axios from 'axios';
import { handleSignout } from '../layouts/admin/helpers';

type Props = {
  isSaveLoading: boolean;
};

const UploadProductsForm = ({ isSaveLoading }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [csvFile, setCSVFile] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const handleCSVFileUpload = (file: string) => {
    setCSVFile(file);
  };

  const uploadImage = async (file: File): Promise<any> => {
    const path = '/api/attachments/addAttachments';

      const formData = new FormData();

      formData.append('files', file);

      const uploadFileResponse = await axios.post(path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return uploadFileResponse.data;
  }

  const handleSave = async () => {
    const files: string[] = [];

    setIsLoading(true);

    for (const imageFile of imageFiles) {
      const imageFileName = await uploadImage(imageFile);

      files.push(imageFileName[0]);
    }

    setIsLoading(false);

    await dispatch(uploadProducts({ csvFile, images: files }));

    router.push('/products');
  };

  const handleImagesSelect = (e: any) => {
    const fileList = e.target.files as FileList;

    setImageFiles(Array.from(fileList));
  };

  console.log(isSaveLoading);

  return (
    <>
      <PageTitle>Загрузка товаров</PageTitle>
      <BreadCrumbs />
      <FormContent>
        <UploadImagesWrapper>
          <ImageFilesTitle>Изображения</ImageFilesTitle>
          <input type="file" multiple onChange={handleImagesSelect} />
          {!!imageFiles.length && (
            <UploadedImagesBody>
              <UploadedImageFilesTitle>Загруженные изображения</UploadedImageFilesTitle>
              <table>
                <tbody>
                  <tr>
                    <th>№</th>
                    <th>Имя файла</th>
                    <th>Формат</th>
                    <th>Размер файла</th>
                  </tr>
                  {imageFiles.map((imageFile, index) => (
                    <tr key={`tr-${index}`}>
                      <td>{index + 1}</td>
                      <td>{imageFile.name}</td>
                      <td>{imageFile.type.split('/')[1]}</td>
                      <td>{Math.round(imageFile.size / 1000)} КБ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </UploadedImagesBody>
          )}
        </UploadImagesWrapper>
        <UploadCSVWrapper>
          <FileUpload
            label="CSV файл"
            description="Перетащите или выберите файл для загрузки"
            type={'File'}
            onChange={handleCSVFileUpload}
          />
        </UploadCSVWrapper>
        <Button
          htmlType={'submit'}
          loading={isSaveLoading || isLoading}
          disabled={isSaveLoading || isLoading}
          onClick={handleSave}
        >
          Сохранить
        </Button>
      </FormContent>
    </>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UploadCSVWrapper = styled.div`
  padding-bottom: 20px;
`;

const UploadImagesWrapper = styled.div`
  padding-bottom: 20px;
`;

const ImageFilesTitle = styled.div`
  font-family: 'Poppins',sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #23262f;
  margin-bottom: 20px;
`;

const ImageFile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UploadedImageFilesTitle = styled.div`
  font-family: 'Poppins',sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #23262f;
  margin-top: 20px;
`;

const UploadedImagesBody = styled.div`
  max-height: 400px;
  overflow: auto;

  table {
    td, th {
      padding: 5px 20px;
    }
  }
`;


export default memo(UploadProductsForm);
