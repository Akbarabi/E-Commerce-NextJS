import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const ImageUpload = () => {
    return (
    <CldUploadWidget uploadPreset="c7o57i0y">
        {({ open }) => {
            return (
                <Button onClick={() => open()}
                className='bg-gray-500 text-white'
                ><Plus className='h-4 w-4 mr-4'/>
                    Upload an Image
                </Button>
            );
        }}
    </CldUploadWidget>
  )
}

export default ImageUpload