import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import MovieInfo from "./pages/Movie/MovieInfo";
import MovieWatch from "./pages/Movie/MovieWatch";
import Search from "./pages/Search";
import Auth from "./pages/Auth";
import TVInfo from "./pages/TV/TVInfo";
import TVWatch from "./pages/TV/TVWatch";
import { useAppDispatch } from "./store/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./shared/firebase";
import { setCurrentUser } from "./store/slice/authSlice";
import { doc, onSnapshot } from "firebase/firestore";
import Bookmarked from "./pages/Bookmarked";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      dispatch(setCurrentUser(null));
      return;
    }

    if (user.providerData[0].providerId === "google.com") {
      dispatch(
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid,
        })
      );
    } else if (user.providerData[0].providerId === "facebook.com") {
      onSnapshot(doc(db, "users", user.uid), (doc) => {
        dispatch(
          setCurrentUser({
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL:
              user.photoURL + "?access_token=" + doc.data()?.token || "",
            uid: user.uid,
          })
        );
      });
    } else {
      onSnapshot(doc(db, "users", user.uid), (doc) => {
        dispatch(
          setCurrentUser({
            displayName:
              doc.data()?.lastName + " " + doc.data()?.firstName || "",
            photoURL: doc.data()?.photoUrl || "",
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid,
          })
        );
      });
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id" element={<MovieInfo />} />
      <Route path="tv/:id" element={<TVInfo />} />
      <Route path="movie/:id/watch" element={<MovieWatch />} />
      <Route path="tv/:id/watch" element={<TVWatch />} />
      <Route path="explore" element={<Explore />} />
      <Route path="search" element={<Search />} />
      <Route path="auth" element={<Auth />} />
      <Route path="bookmarked" element={<Bookmarked />} />
    </Routes>
  );
}

export default App;
