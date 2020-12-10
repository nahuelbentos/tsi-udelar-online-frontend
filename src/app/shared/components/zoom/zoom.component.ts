import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ZoomMtg } from '@zoomus/websdk';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {
  // esto al environment y que sea zoom: {signatureEndpoint = 'https://signaturezoom.herokuapp.com/', apiKey = '2qUjpUXKSwSjdEgKUzEZLA',  leaveUrl = 'http://localhost:4200' }
  signatureEndpoint = 'https://signaturezoom.herokuapp.com/';
  apiKey = '2qUjpUXKSwSjdEgKUzEZLA';
  //apiSecret = 'ULb009E2zBN5ASyQCXYmGlsOjF9qWvfOcJNg'
  //signatureEndpoint =''
  //apiKey = 'OSKxD3BeKWL0s7ojBV8GGJC9RWsD6Hsiq7Yn'
  role = 0;
  leaveUrl = 'http://localhost:4200';

  // Parametros
  // se guardan en el curso
  meetingNumber = '99644515024';
  passWord = 'MEg5M3NoMWcrYXFFYkk1WEk2RGVIQT09';
  // es el nombre del alumno o el email
  userName = 'Angular';
  userEmail = '';
  //https://zoom.us/j/98050033235?pwd=VVBmeVRvMnJON1h0eXlXM1preEJNUT09
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document, private route: ActivatedRoute,) {}

  ngOnInit() {
    const param = JSON.parse( localStorage.getItem('queryParams'));
    localStorage.removeItem('queryParams');
     
 
    this.meetingNumber = param.meetingNumber;
    this.passWord = param.passWord;
    this.userName = param.userName;
  
  }

  getSignature() {
    this.httpClient
      .post(this.signatureEndpoint, {
        meetingNumber: this.meetingNumber,
        role: this.role,
      })
      .toPromise()
      .then((data: any) => {
        if (data.signature) {
          console.log(data.signature);
          this.startMeeting(data.signature);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
