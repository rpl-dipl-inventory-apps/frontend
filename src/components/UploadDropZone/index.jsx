/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { ReactComponent as Uploader } from 'assets/uploader.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const borderActive = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='27' ry='27' stroke='%23B74646FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='37' stroke-linecap='square'/%3e%3c/svg%3e")`;
const borderNonActive = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='27' ry='27' stroke='%23B5A2A2FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='37' stroke-linecap='square'/%3e%3c/svg%3e")`;

const UploadDropZone = (props) => {
    const { imageUrl, setUploadedFile } = props;
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (imageUrl) {
            setImagePreview(imageUrl);
        }
    }, [imageUrl]);

    const [isInputImageHovered, setIsInputImageHovered] =
        useState(false);

    const handlerDrop = (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        setUploadedFile(uploadedFile);
        var reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onload = () => {
            setImagePreview(reader.result);
        };
    };

    const { getInputProps, getRootProps } = useDropzone({
        onDrop: handlerDrop,
        accept: 'image/*',
        multiple: false,
        onDragOver: () => {
            setIsInputImageHovered(true);
        },
        onDragLeave: () => {
            setIsInputImageHovered(false);
        },
        disabled: imagePreview,
    });

    return (
        <div
            onMouseOver={() => setIsInputImageHovered(true)}
            onMouseOut={() => setIsInputImageHovered(false)}
            style={{
                backgroundImage: `${
                    isInputImageHovered && !imagePreview
                        ? borderActive
                        : borderNonActive
                }`,
            }}
            className={`h-50 w-full md:w-1/2 xl:w-1/4 bg-theme-brown-300 rounded-2xl relative transition-all duration-300 flex justify-center items-center ${
                !imagePreview && 'cursor-pointer'
            }`}
        >
            <div
                {...getRootProps({
                    className: `${
                        !imagePreview && 'dropzone disabled'
                    }`,
                })}
                className={`flex justify-center items-center flex-col h-1/2 my-auto px-3 text-sm text-gray-500 ${
                    isInputImageHovered && !imagePreview && 'shake'
                }`}
            >
                {!imagePreview && <Uploader />}

                <input {...getInputProps()} />
                <p>
                    {!imagePreview && (
                        <>
                            <p>Drop your images here or browse.</p>
                            <br />{' '}
                            <p>
                                if jpg can&apos;t be uploaded, please
                                try png
                            </p>
                        </>
                    )}
                </p>
            </div>
            {imagePreview && (
                <div className="w-4/5 h-3/5 z-10 absolute top-0 left-0 right-0 bottom-0 m-auto">
                    <button
                        type="button"
                        onClick={() => {
                            setImagePreview(null);
                            setUploadedFile(null);
                        }}
                        className="cursor-pointer absolute -top-2 bg-theme-brown-100 px-1 rounded-full font-bold hover:text-red-500 transition-all duration-300 outline-none focus:outline-none z-10"
                    >
                        ✕
                    </button>
                    <img
                        className="rounded-2xl w-full h-full border border-gray-300"
                        src={imagePreview}
                        alt="preview"
                    />
                </div>
            )}
        </div>
    );
};

export default UploadDropZone;
