import { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface UploadImageProps {
    onChange?: (imageList: ImageListType) => void;
}
const UploadImage = ({
    onChange,
}: UploadImageProps) => {
    const [images, setImages] = useState<ImageListType>([]);

    const onChangeImage = (imageList: ImageListType) => {
      setImages(imageList);
      onChange?.(imageList);
    };
  
    return (
      <div>
        <ImageUploading
          multiple
          value={images}
          onChange={onChangeImage}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: 'red' } : undefined}
                className='p-2 bg-blue-500 text-white rounded'
                onClick={onImageUpload}
                type='button'
                {...dragProps}
              >
                Tải ảnh
              </button>
              <div className="grid grid-cols-8 mt-2">
                {imageList.map((image, index) => (
                  <div key={index}>
                    <img src={image.dataURL} alt={image.file?.name} className='w-20 h-20' />
                    <div className="flex gap-2 items-center mt-2">
                      <button className='p-2 bg-blue-500 text-white rounded' onClick={() => onImageUpdate(index)}>Cập nhật</button>
                      <button className='p-2 bg-red-500 text-white rounded' onClick={() => onImageRemove(index)}>Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    );
}

export default UploadImage