import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig.ts"

export default async function register(email: string, password: string): Promise<string> {
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
