import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Chat } from 'src/app/models/chat/chat.model';
import { Conversacion } from 'src/app/models/chat/conversacion.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.scss'],
})
export class SalaChatComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1325px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  agrandarPadding$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  currentUser: Usuario;
  usuarios: Usuario[] = [];

  showMensajes = false; // Toggle to select a conversation.
  public mensajes: Array<any> = []; // messages array/
  mensaje = ''; // the  message to be sent

  userFilter = { nombres: '' };

  constructor(
    private chatService: ChatService,
    private scrollToService: ScrollToService,
    private breakpointObserver: BreakpointObserver,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.autenticacionService.getUser();

    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('state ::::: ', state);
        } else {
          console.log('else state ::::: ', state);
        }
      });

    this.chatService.getUsuarios().subscribe((data) => {
      const usersFirebase: any = data.map((e) => {
        return e.payload.doc.data();
      });

      const temp = usersFirebase.filter( (usuario) => usuario.userName !== this.autenticacionService.getUser().userName);
      this.usuarios = []; 
      
      for (const user of temp) {
        const usuario: Usuario = {
          nombres: user.nombres,
          apellidos: user.apellidos,
          email: user.email,
          emailPersonal: user.emailPersonal,
          userName: user.userName,
          id: user.id,
          tipo: user.tipo,
          facultad: user.facultad,
        }; 
       
        this.chatService
          .getChatPorUsuario(this.currentUser, usuario)
          .subscribe((respChat) => {
    
            if (respChat.length === 0) {
              this.obtenerChatEmisor(usuario);
              return;
            }

            const idChatArray: string[] = respChat.map((e) =>  e.payload.doc.id);
            // Me devuelve un array de un unico elemento, así que me quedo con el elemento.
            const idChat: string = idChatArray.find((e) => e);

            this.chatService
              .getConversacionPorChat(idChat)
              .subscribe((conversacionChanges) => {
                if (conversacionChanges.length !== 0) {
                  // tslint:disable-next-line: no-shadowed-variable
                  const temp: any = conversacionChanges.map((e) => e.payload.doc.data());

                  this.evaluarConversacion(temp, usuario);
                }
              });
          });

        this.usuarios.push(usuario);
      }
    });
  }

  obtenerChatEmisor(usuario) {
    this.chatService
      .getChatPorUsuarioEmisor(this.currentUser, usuario)
      .subscribe((respChatEmisor) => {
        
 
        if (respChatEmisor.length === 0) {
          return;
        }

        const idChatArray: string[] = respChatEmisor.map((e) => e.payload.doc.id);

        // Me devuelve un array de un unico elemento, así que me quedo con el elemento.
        const idChat: string = idChatArray.find((e) => e);

        this.chatService
          .getConversacionPorChat(idChat)
          .subscribe((conversacionChanges) => {
            if (conversacionChanges.length !== 0) {
              const temp: any = conversacionChanges.map((e) => e.payload.doc.data());
              this.evaluarConversacion(temp, usuario);
            }
          });
      });
  }

  evaluarConversacion(temp, usuario) {
    
    const element = temp.find((e) => e);

    if (element) {
      const conversacion: Conversacion = {
        idChat: element.idChat,
        idConversacion: element.idConversacion,
        mensajes: element.mensajes,
      };

      if (conversacion.mensajes.length > 0) {
        const index = conversacion.mensajes.length - 1;
        if (!conversacion.mensajes[index].mensajeReceptorVisto) {
          this.usuarios = this.usuarios.map((u) => {

            if (
              u.userName === usuario.userName &&
              conversacion.mensajes[index].usuarioEmisor === u.userName
            ) {
      
              u.mensajeVisto = conversacion.mensajes[index].mensajeReceptorVisto;
              u.mensajeTimestamp = conversacion.mensajes[index].timestamp; 
            }
            return u;
          });


        }
      }
    }
  }

  seleccionarUsuario(usuario: Usuario) {
    console.log(usuario);
    const chat: Chat = {
      // idChat: this.chatService.createId(),
      usuarioEmisor: this.currentUser.userName,
      usuarioReceptor: usuario.userName,
    };

    this.usuarios = this.usuarios.map((u) => {
      if (u.userName === usuario.userName) {
        u.mensajeVisto = true;
      }
      return u;
    });

    this.chatService.getChats().subscribe((querySnapshot) => {
      let chatCurrent: Chat;

      querySnapshot.forEach((doc) => {
        // Chat del currentUser
        if (
          doc.data().usuarioReceptor === usuario.userName &&
          doc.data().usuarioEmisor === this.currentUser.userName
        ) {
          chatCurrent = {
            idChat: doc.id, // data().idChat,
            usuarioEmisor: doc.data().usuarioEmisor,
            usuarioReceptor: doc.data().usuarioReceptor,
          };

          return;
        } else {
          // Chat donde el currentUser es receptor
          if (
            doc.data().usuarioEmisor === usuario.userName &&
            doc.data().usuarioReceptor === this.currentUser.userName
          ) {
            chatCurrent = {
              idChat: doc.id, // data().idChat,
              usuarioEmisor: doc.data().usuarioEmisor,
              usuarioReceptor: doc.data().usuarioReceptor,
            };

            return;
          }
        }
      });

      if (!chatCurrent) {
        this.chatService.createChat(chat).then((ref) => {
          const conversacion: Conversacion = {
            idChat: ref.id,
            mensajes: [],
          };

          this.chatService.createConversacion(conversacion).then((refConv) => {
            const conv: Conversacion = {
              idChat: conversacion.idChat,
              mensajes: [],
              idConversacion: refConv.id,
            };

            this.chatService.setCurrentConversacion(conv);

            this.chatService.cargarMensajes().subscribe((data) => {

              this.mensajes = data.mensajes;
              // scroll to bottom
              setTimeout(() => this.triggerScrollTo(), 1000);
            });
          });
        });
      } else {
        let convCurrent: Conversacion;
        this.chatService.getConversaciones().subscribe((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Conversacion del currentUser
            if (doc.data().idChat === chatCurrent.idChat) {
              convCurrent = {
                idConversacion: doc.id, // data().idChat,
                idChat: doc.data().idChat,
                mensajes: doc.data().mensajes,
              };

              this.mensajes = convCurrent.mensajes;
              this.chatService.setCurrentConversacion(convCurrent);

              this.chatService.cargarMensajes().subscribe((data) => {

                this.mensajes = data.mensajes;
                // scroll to bottom
                setTimeout(() => this.triggerScrollTo(), 1000);
              });
              return;
            }
          });
        });
      }

      this.showMensajes = true;
    });
  }

  enviarMensaje() {
    // If message string is empty
    if (this.mensaje === '') {
      return;
    }
    // set the mensaje object
    const msg = {
      usuarioEmisor: this.currentUser.userName,
      emisorNombre: this.currentUser.nombres,
      // Revisar foto
      // emisorFoto: this.currentUser.photoUrl,
      timestamp: new Date(),
      fecha: new Date(),
      contenido: this.mensaje,
      mensajeEmisorVisto: true,
      mensajeReceptorVisto: false,
    };
    // empty mensaje
    this.mensaje = '';
    // update
    this.mensajes.push(msg);

    this.chatService.enviarMensaje(this.mensajes).then(() =>  console.log('enviado'));
  }

  // Scroll to the bottom
  public triggerScrollTo() {
    const config: ScrollToConfigOptions = {
      target: 'destination',
    };
    this.scrollToService.scrollTo(config);
  }
}
