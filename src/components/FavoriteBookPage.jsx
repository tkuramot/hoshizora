import { useFavoriteBook } from "@/hooks/useFavoriteBook";

export default function FavoriteBookPage() {
  const {
    favoriteBooks,
    addFavoriteBook,
    deleteFavoriteBook,
  } = useFavoriteBook();

  return (
    <div>
      <h2>Favorite Books</h2>
      <ul>
        {favoriteBooks.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => deleteFavoriteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const title = e.target.elements.title.value;
          const author = e.target.elements.author.value;
          await addFavoriteBook({ title, author });
          e.target.reset();
        }}
      >
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="author" placeholder="Author" required />
        <button type="submit">Add Favorite Book</button>
      </form>
    </div>
  );
}
