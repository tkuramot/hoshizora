import { useFavoriteBook } from "@/hooks/useFavoriteBook";
import "./FavoriteBookPage.css";

export default function HomePage() {
  const { favoriteBooks } = useFavoriteBook();

  return (
    <>
      <div className="background">
        <div className="overlay"></div>
        <div className="content-container content">
          {favoriteBooks.map((favoriteBook) => (
            <div key={favoriteBook.id}>
              <pre>{favoriteBook.text}</pre>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
