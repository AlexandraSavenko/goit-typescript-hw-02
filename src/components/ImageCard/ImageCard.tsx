import { IPhotoData } from "../../App";
import css from "./ImageCard.module.css";

interface Props {
picture: IPhotoData;
onModalOpen: (picture: IPhotoData) => void;
}

export default function ImageCard({ picture, onModalOpen }:Props) {
  return (
    <div onClick={() => onModalOpen(picture)}>
      <img
        className={css.image}
        src={picture.urls.small}
        alt={picture.alt_description}
      />
    </div>
  );
}
