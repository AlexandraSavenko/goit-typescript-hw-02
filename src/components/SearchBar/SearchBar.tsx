import { BsSearch } from "react-icons/bs";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { FormEvent } from "react";

// interface Props {
//   onSubmit: (newTopic: string) => void;
// }

interface Props{
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (newTopic: string) => void;

}
export default function SearchBar({ query, setQuery, handleSubmit }:Props) {



  const handleInputSubmit = (event: FormEvent) => {
    event.preventDefault();
    // const query: string = event.target.elements.searchword.value.trim();

    if (!query) {
      toast.error("Write your query, please!", {
        duration: 4000,
        position: "top-left",
        style: { color: "red" },
      });
      return;
    }
    handleSubmit()
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleInputSubmit}>
        <input
          type="text"
          className={css.input}
          name="searchword"
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={css.button} type="submit">
          <BsSearch className={css.iconbtn} />
        </button>
      </form>
    </header>
  );
}
