import { ChangeEvent, useRef } from 'react';
import styled from '@emotion/styled';

import Button, { ButtonProps } from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';

export type FilesPreview = {
  fileName: File['name'];
  previewUrl: string;
};

export type FileType = {
  previewImages: FilesPreview[];
  formData?: FormData;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Props = StackProps & {
  multiple?: boolean;
  onUploadChange: (filesData: FileType) => void;
  buttonUpload: ButtonProps & { label: string };
};

const InputUpload = ({ onUploadChange, multiple, buttonUpload: { label, ...btnRest } }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const formData = new FormData();
    const previewImages = [];

    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        formData.append('files', file);
        previewImages.push({
          fileName: file.name,
          previewUrl: URL.createObjectURL(file),
        });
      }
    }

    onUploadChange({
      formData,
      previewImages,
    });
  };

  return (
    <Stack>
      {/* {children} */}
      <Button component="label" {...btnRest}>
        {label}
        <VisuallyHiddenInput
          id="files"
          type="file"
          multiple={multiple}
          ref={inputRef}
          onChange={e => {
            onFileChange(e);
            // openCropImage();
          }}
        />
      </Button>
    </Stack>
  );
};

export default InputUpload;
