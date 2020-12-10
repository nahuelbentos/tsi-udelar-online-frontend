import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat/chat.model';
import { Conversacion } from '../models/chat/conversacion.model';
import { Mensaje } from '../models/mensaje.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public usuarios: Observable<Usuario[]>;

  public mensajes: Array<any> = []; // mensajes array/
  temp: any; // for handling temporory data from observables.
  showMensajes = false; // Toggle to select a conversation.
  mensaje = ''; // the  message to be sent

  private mensajesCollection: AngularFirestoreCollection<Mensaje>;

  public messages = [];

  public conversacion: Conversacion = {
    idChat: '',
    mensajes: [],
  };

  conversationId;

  // videochat
  // callActive = false;
  // pc: any;
  // localStream: any;
  // channel: AngularFireList<{}>;
  // database: firebase.database.Reference;
  // senderId: string;

  constructor(
    private firestore: AngularFirestore,
    private firebase: AngularFireDatabase
  ) {}

  createId() {
    return this.firestore.createId();
  }
  // Usuarios
  createUsuario = (usuario: Usuario) =>
    this.firestore.doc('usuarios/' + usuario.email).set(usuario);

  updateUsuario = (usuario: Usuario) =>
    this.firestore.doc<Usuario>('usuarios/' + usuario.email).update(usuario);

  getUsuarios = () => this.firestore.collection('usuarios').snapshotChanges();

  // Chat
  createChat(chat: Chat) {
    return this.firestore.collection('chat').add(chat);
  }

  getChats() {
    return this.firestore.collection<any>('chat').get();
  }

  getChatsCiudadanos() {
    return this.firestore.collection('chat').snapshotChanges();
  }

  // Conversacion
  createConversacion = (conversacion: Conversacion) =>
    this.firestore.collection('conversacion').add(conversacion);

  setCurrentConversacion(conversacion: Conversacion) {
    this.conversacion = conversacion;
  }

  getCurrentConversacion(): Conversacion {
    return this.conversacion;
  }

  getConversaciones = () =>
    this.firestore.collection<any>('conversacion').get();

  enviarMensaje = (mensajes) =>
    this.firestore
      .doc('conversacion/' + this.conversacion.idConversacion)
      .update({ mensajes });

  // Mensajes

  cargarMensajes() {
    this.setMensajeLeido(
      this.conversacion.idConversacion,
      this.conversacion.mensajes
    ).then((res) => console.log('setMensajeLeido, res: ', res));
    return this.firestore
      .doc<Conversacion>('conversacion/' + this.conversacion.idConversacion)
      .valueChanges();
  }

  setMensajeLeido(idConversacion: string, mensajes) {

    if (mensajes.length > 0) {
      const index = mensajes.length - 1;
      mensajes[index].mensajeReceptorVisto = true;
    }

    // Seteo todos los mensajes devuelta, con el mensaje leido porque arme mal la estructura en firebase
    return this.firestore
      .doc('conversacion/' + idConversacion)
      .update({ mensajes });
  }

  getChatPorUsuario(usuario: Usuario, usuarioEmisor: Usuario) {
    return this.firestore
      .collection('chat', (ref) =>
        ref
          .where('usuarioReceptor', '==', usuario.userName)
          .where('usuarioEmisor', '==', usuarioEmisor.userName)
      )
      .snapshotChanges();
  }

  getChatPorUsuarioEmisor(usuario: Usuario, usuarioEmisor: Usuario) {
    return this.firestore
      .collection('chat', (ref) =>
        ref
          .where('usuarioEmisor', '==', usuario.userName)
          .where('usuarioReceptor', '==', usuarioEmisor.userName)
      )
      .snapshotChanges();
  }

  getConversacionPorChat = (idChat) =>
    this.firestore
      .collection('conversacion', (ref) => ref.where('idChat', '==', idChat))
      .snapshotChanges();
}
