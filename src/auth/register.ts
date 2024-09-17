import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig.ts"

export default async function register(email: string, password: string): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User registered successfully:', user);
  } catch (error: any) {
    console.log('Error during registration:', error.message);
    throw error;
  }
}
