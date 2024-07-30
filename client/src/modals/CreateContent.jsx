import { Box, Modal, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CreateContent = ({ openModal, setOpenModal }) => {

    const userId = useSelector(state => state.user.user.uid)
    const fileInputRef = useRef(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpenModal(false)
        setOpen(false)
    };

    useEffect(() => {
        setOpen(openModal);
    }, [])

    const BASE_URL = import.meta.env.VITE_SERVER_URL;

    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [contentFileType, setFileType] = useState("");

    const handleCreatePost = async () => {

        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }
        
        try {

            const name = + Date.now() + selectedFile.name
            const uploadRef = ref(storage, `${contentFileType}s/${name}`)
            const snapshot = await uploadBytes(uploadRef, selectedFile);
            const contentUrl = await getDownloadURL(snapshot.ref)
            if (contentUrl) { // dosya yüklendiyse içeriği oluştur
                const response = await axios.post(`${BASE_URL}/create-post`, { contentUrl, contentFileType, content, userId });
                if (response.data.status === "success") {
                    toast.success(response.data.message);
                    setOpen(false);
                    setOpenModal(false);
                } else {
                    toast.error(response.data.message);
                }
                console.log(response.data);
            }

        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('An error occurred while creating post.');
        }
    };
    const handleRemoveFile = () => {
        setPreviewFile(null);
        setSelectedFile(null);
        fileInputRef.current.value = null;
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewFile({ url: URL.createObjectURL(file), type: file.type });
            if (file.type.startsWith("image")) {
                setFileType("image")
            } else if (file.type.startsWith("video")) {
                setFileType("video")
            }
            else if (file.type.startsWith("audio")) {
                setFileType("audio")
            }
            else {
                setFileType(null);
            }
        } else {
            setPreviewFile(null);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-[95%] max-sm:text-xs p-6 outline-indigo-400 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%]">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create New Post
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        {contentFileType}
                        <div className="my-2">
                            <label htmlFor="file" className="block mb-2 text-sm font-medium">File</label>
                            <input
                                type="file"
                                id="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="border dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent"
                            />
                        </div>
                        <div>
                            {previewFile !== null &&
                                <div>
                                    <span>Preview</span>
                                    {previewFile.type.startsWith('video/') ? (
                                        <video controls src={previewFile.url} className='w-full object-cover max-h-96 mb-2'>
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        previewFile.type.startsWith('image/') ? (
                                            <img src={previewFile.url} alt='preview' className='w-full object-cover max-h-96 mb-2' />
                                        ) : (
                                            <audio controls src={previewFile.url} className='w-full object-cover max-h-96 mb-2'>
                                                Your browser does not support the video tag.
                                            </audio>
                                        )
                                    )
                                    }
                                    <button onClick={handleRemoveFile} className='bg-red-600 px-3 rounded-lg text-white py-1'>Remove</button>
                                </div>
                            }
                        </div>
                        <div className="my-4">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium">Content</label>
                            <textarea name="content" id="content" rows="5" placeholder='Content..' className='resize-none w-full p-2 border dark:border-[#777777] dark:border-opacity-30 rounded-md outline-none dark:bg-transparent ' onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                        <div className="flex justify-end bg-white dark:bg-transparent my-3">
                            <button onClick={handleCreatePost} type="submit" className="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800">Create</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateContent