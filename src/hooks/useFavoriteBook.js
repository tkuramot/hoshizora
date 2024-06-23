import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

const useFavoriteBook = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const auth = useAuth();
  const userId = auth.user?.uid;

  const fetchFavoriteBooks = async () => {
    if (!userId) return;

    try {
      const snapshot = await getDocs(
        collection(firestore, `users/${userId}/favorites`),
      );
      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavoriteBooks(books);
    } catch (error) {
      console.error("Error fetching favorite books: ", error);
    }
  };

  useEffect(() => {
    fetchFavoriteBooks();
    console.log(favoriteBooks);
  }, [auth.user]);

  const addFavoriteBook = async (bookInfo) => {
    console.log("userId", userId);
    if (!userId) return;

    try {
      const docRef = await addDoc(
        collection(firestore, `users/${userId}/favorites`),
        bookInfo,
      );
      console.log("Document written with ID: ", docRef.id);
      setFavoriteBooks((
        prevBooks,
      ) => [...prevBooks, { id: docRef.id, ...bookInfo }]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteFavoriteBook = async (bookId) => {
    if (!userId) return;

    try {
      await deleteDoc(doc(firestore, `users/${userId}/favorites`, bookId));
      console.log("Document successfully deleted!");
      setFavoriteBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return {
    favoriteBooks,
    addFavoriteBook,
    deleteFavoriteBook,
  };
};

export { useFavoriteBook };
