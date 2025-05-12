import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { IPhotoData } from '../../App'

interface Props {
resultsArr: IPhotoData[];
onModalOpen: (picture: IPhotoData) => void
}

export default function ImageGallery({ resultsArr, onModalOpen }: Props) {
  console.log(resultsArr)
  return (
    <ul className={css.list}>
      {resultsArr.map((image) => (
        <li className={css.item} key={image.id}>
          <ImageCard picture={image} onModalOpen={onModalOpen} />
        </li>
      ))}
    </ul>
  );
}
