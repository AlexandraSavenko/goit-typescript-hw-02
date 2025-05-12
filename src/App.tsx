import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { fetchPhoto } from "./fetchPhoto";
import LoadMoreButton from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";


interface IPhotoData {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  // Add other properties here as needed
}

export interface IBigPicture {
  src: string;
  altDescription: string | null;
  alt_description: string| undefined;
  description: string | null;
  urls: {regular: string | undefined}
}

Modal.setAppElement("#root");

function App() {
    const [query, setQuery] = useState('')
  const [text, setText] = useState<IPhotoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [bigpicture, setBigpicture] = useState<IBigPicture | null>(null);

  console.log(text)
  const handleTopicSubmit = () => {
    setTopic(query);
    setPage(1);
    setText([]);
  };

  useEffect(() => {
    if (!topic) {
      return;
    }
    const fetchData = async (topic: string, page: number) => {
      try {
        setLoading(true);
        setErr(false);
        const fetchedPhotos = await fetchPhoto<IPhotoData>(topic, page);

        setText((prevText): IPhotoData[] =>
          page === 1
            ? Array.isArray(fetchedPhotos)
              ? fetchedPhotos
              : []
            : [
                ...prevText,
                ...(Array.isArray(fetchedPhotos) ? fetchedPhotos : []),
              ]
        );
      } catch (err) {
  if (err instanceof Error) {
    console.log(err.message);
  } else {
    console.log("Unknown error", err);
  }
  setErr(true);
  setLoading(false)
} finally {
        setLoading(false);
      }
    };
    fetchData(topic, page);
  }, [page, topic]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleModal = (picture: IBigPicture) => {
    setBigpicture(picture);
    setModal(true);
  };

  const ModalClose = () => {
    setModal(false);
  };

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} handleSubmit={handleTopicSubmit} />
      <Toaster />
      <ImageGallery resultsArr={text} onModalOpen={handleModal} />
      {loading && <Loader />}
      {text.length > 0 && <LoadMoreButton onLoadMore={handleLoadMore} />}
      {err && <ErrorMessage />}
      <ImageModal isOpen={modal} onClose={ModalClose} modalData={bigpicture} />
    </div>
  );
}

export default App;
