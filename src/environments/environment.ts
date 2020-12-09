// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:5000/api',
  limitMB: 10485760,
  firebase: {
    apiKey: 'AIzaSyAz399IewsIRSjTJvSTqe00Ari9Ql8feEk',
    authDomain: 'udelar-online.firebaseapp.com',
    projectId: 'udelar-online',
    storageBucket: 'udelar-online.appspot.com',
    messagingSenderId: '1055360898923',
    appId: '1:1055360898923:web:27091f006139d74c3a5e2e',
    measurementId: 'G-7QCT7DJY8E',
  },
  //baseUrl: 'http://node789-api-udelaronline.web.elasticloud.uy:11015/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
