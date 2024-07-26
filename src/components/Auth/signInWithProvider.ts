import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../shared/firebase";

export const signInWithProvider = (provider: any, type: string) => {
  signInWithPopup(auth, provider).then(async (result) => {
    const user = result.user;

    // Check if user info is already stored in Firestore before
    let isStored = false;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.id === user.uid) {
        isStored = true;
      }
    });

    if (isStored) return;

    let token;
    if (type === "facebook") {
      // If logined with facebook, I need to store additional info about "token" because I can only get profile picture "photoURL" from FB API when I add "?access_token={someToken}", so I store that "someToken" is my FireStore
      const credential = FacebookAuthProvider.credentialFromResult(result);
      token = credential?.accessToken;
    }

    setDoc(doc(db, "users", user.uid), {
      firstName: user.displayName,
      lastName: "",
      ...(type === "google" && { photoUrl: user.photoURL }),
      ...(type === "facebook" && {
        photoUrl: user.photoURL + "?access_token=" + token,
      }),
      bookmarks: [],
      recentlyWatch: [],
      ...(type === "facebook" && { token }),
    });
  });
};
