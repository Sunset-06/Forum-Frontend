import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig.ts"

export default async function login(email: string, password: string): Promise<void> {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
    })
    .catch((error) => {
      throw error;
    });
}