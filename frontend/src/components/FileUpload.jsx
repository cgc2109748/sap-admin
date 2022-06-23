import { Group, Text, useMantineTheme, MantineTheme, Image, Button } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useState, useContext } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { FileUploadContext } from '../pages/products/AddForm';
import { showNotification } from '@mantine/notifications';

function getIconColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({ status, ...props }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (status, theme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 120, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      <Text size="xl" inline>
        将图片拖至此处或单击以选择文件
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        每次最多只能上传1个文件，每个文件不应超过 5mb
      </Text>
    </div>
  </Group>
);

const FileUpload = (onDrop) => {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  // const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  const { file, setFile,
    // imageUrl, setImageUrl
  } = useContext(FileUploadContext);

  const form = useForm({
    initialValues: {
      file: null,
    },
  });

  const onDropHandler = (files) => {
    setFile(files[0]);
    setUrl(URL.createObjectURL(files[0]));
    if (!_.isEmpty(onDrop)) {
      onDrop(files[0].file);
    }
  };

  // const upload = () => {
  //   if (loading) return;
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   console.log('file: ', file);
  //   axios
  //     .post('/api/upload', formData, {
  //       header: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.code === 200) {
  //         setImageUrl(res.data.url);
  //         showNotification({
  //           title: '上传成功！',
  //           color: 'green',
  //         });
  //         setLoading(false);
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       setLoading(false);
  //     });
  // };
  return (
    <>
      {url ? (
        <Group style={{ display: 'flex', justifyContent: 'start' }}>
          <Image src={url} radius="md" alt="preview" height="120px" width="auto" />
          {/*<Button onClick={upload} loading={loading}>*/}
          {/*  上传*/}
          {/*</Button>*/}
        </Group>
      ) : (
        <Dropzone
          onDrop={(files) => onDropHandler(files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
      )}
    </>
  );
};

export default FileUpload;
