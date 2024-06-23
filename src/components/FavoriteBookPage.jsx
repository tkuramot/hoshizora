import { useFavoriteBook } from "@/hooks/useFavoriteBook";
import "./FavoriteBookPage.css";
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const { favoriteBooks } = useFavoriteBook();

  return (
    <>
      <div className="background">
        <div className="overlay"></div>
        <div className="content-container">
          <div>{favoriteBooks.length} 件のお気に入り</div>
          {favoriteBooks.map((favoriteBook) => (
            <Card key={favoriteBook.id}>
              <pre>{favoriteBook.text}</pre>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
