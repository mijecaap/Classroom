import firebaseConfig from "./config";

import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import useEstudiantes from "../hooks/useEstudiantes";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // Registra un usuario
  async registrar(nombre, email, password, tipo) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.db.collection(tipo).add({ uid: nuevoUsuario.user.uid });
    return await nuevoUsuario.user.updateProfile({
      displayName: nombre,
    });
  }

  // Inicia Sesión del usuario
  async login(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        return result;
      });
  }

  // Cierra la sesión del usuario
  async cerrarSesion() {
    await this.auth.signOut();
  }
}
const firebase = new Firebase();
export default firebase;
