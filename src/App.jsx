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

Modal.setAppElement("#root");

function App() {
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [bigpicture, setBigpicture] = useState(null);

  const handleTopicSubmit = (newTopic) => {
    setTopic(newTopic);
    setPage(1);
    setText([]);
  };
  useEffect(() => {
    if (!topic) {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setErr(false);
        const fetchedPhotos = await fetchPhoto(topic, page);
        setText((prevText) =>
          page === 1 ? fetchedPhotos : [...prevText, ...fetchedPhotos]
        );
      } catch (error) {
        setErr(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, topic]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleModal = (picture) => {
    setBigpicture(picture);
    setModal(true);
  };

  const ModalClose = () => {
    setModal(false);
  };
  return (
    <div>
      <SearchBar onSubmit={handleTopicSubmit} value={topic} />
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
