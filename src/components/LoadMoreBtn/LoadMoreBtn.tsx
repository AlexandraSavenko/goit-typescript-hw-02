import css from "./LoadMoreBtn.module.css";

interface Props {
  onLoadMore: () => void;
}

export default function LoadMoreButton({ onLoadMore }: Props) {
  return (
    <div>
      <button className={css.button} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
}
