import { createContext, ReactNode, useState, useEffect } from "react";
import { auth, firebase } from "../services/firebase";

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    logOutGoogleAccount: () => Promise<void>;
  }
  
  type User = {
    id: string;
    name: string;
    avatar: string;
    isLoggedIn: boolean;
  }

  type AuthContextProviderProps = {
      children: ReactNode;
  }

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {


    const [ user, setUser ] = useState<User>();
    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser ({
          id: uid,
          name: displayName,
          avatar: photoURL,
          isLoggedIn: true,
        })
      }
    })

    return () => {
      unsubscribe();
    }

  }, []);

 

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await  auth.signInWithPopup(provider);

   
        if(result.user) {
          const { displayName, photoURL, uid } = result.user;

          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
          }

          setUser ({
            id: uid,
            name: displayName,
            avatar: photoURL,
            isLoggedIn: true,
          })
        }

        

}

async function logOutGoogleAccount() {

  const userCurrentState = await auth.currentUser;

  if(userCurrentState !== null) {
    await auth.signOut();
    setUser(undefined);
  } else
  if(userCurrentState === null) {
    throw new Error("User already is logged out!");
  }

}


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logOutGoogleAccount }}>
            {props.children}
        </AuthContext.Provider>
    );
}