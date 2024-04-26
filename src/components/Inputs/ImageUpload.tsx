import { ChangeEvent, useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
    value: string;
    onChange: (value: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
}) => {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target

        if(files && files[0]) {
            const selectedFile = files[0]
            onChange(selectedFile)
        }
    }, [onChange])
    
  return (
    <div
        className='
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed
            border-2
            p-32
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
        '
    >
        <input 
            type='file' 
            id='imageUrl'
            name='imageUrl' 
            accept="image/x-png,image/jpeg" 
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" // Added absolute positioning
            onChange={handleChange}
        />
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">
            Click to upload
        </div>
        { value && (
            <div className="absolute inset-0 w-full h-full z-1">
                <img alt="Upload" src={value} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
        )}
    </div>
  )
}

export default ImageUpload