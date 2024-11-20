import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from "../firebaseConfig.ts"

export async function login(email: string, password: string): Promise<void> {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
    })
    .catch((error) => {
      throw error;
    });
}

export async function register(email: string, password: string): Promise<string> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    console.log('User registered successfully in Firebase:', userId);
    return userId;
  } catch (error: any) {
    console.log('Error during registration:', error.message);
    throw error;
  }
}

export async function logout(): Promise<void>{
  signOut(auth).then(() => {
    location.replace("/");
  }).catch((error) => {
    console.log("Error during logout: ", error.message);
     
  });
}