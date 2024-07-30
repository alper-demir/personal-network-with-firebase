import { useEffect, useState } from "react";
import { storage } from "./firebase.js"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";

function App() {
  const username = useSelector(state => state.user.user.displayName || "");
  const userId = useSelector(state => state.user.user.uid || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  const upload = async () => {
    if (selectedFile) {
      const name = + Date.now() + selectedFile.name
      const uploadRef = ref(storage, `images/${name}`)
      const snapshot = await uploadBytes(uploadRef, selectedFile);
      console.log("Dosya yüklendi: " + JSON.stringify(snapshot));
      const uploadedFileUrl = await getDownloadURL(snapshot.ref)
      console.log(uploadedFileUrl);
      setImages((prev) => [...prev, uploadedFileUrl])
    }
  }

  const listImages = async () => {
    const listRef = ref(storage, 'images/');
    const list = await listAll(listRef);
    list.items.forEach(item => {
      getDownloadURL(item).then(url => {
        setImages((prev) => [...prev, url])
      })
    })
    console.log(list);

  }

  useEffect(() => {
    listImages();
  }, [])

  return (
    <div className="min-h-screen pb-20">
      <h2>Home {username || "aa"} {userId || ""}</h2>

      <input type="file" name="" id="" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <br />
      <button onClick={upload} className="p-2 bg-indigo-400 text-black rounded-md mt-3">Yükle</button>
      {/* {
        images &&
        images.map((img, index) => (
          
        ))
      } */}
      <br />
      <img className="w-40 h-40" src="https://firebasestorage.googleapis.com/v0/b/test-auth-506a5.appspot.com/o/images%2F17217536499322981509.jpg?alt=media&token=6e6d5a0f-891f-4ecd-b8cb-276a15bae8ef" alt="" />
    </div>
  )
}

export default App