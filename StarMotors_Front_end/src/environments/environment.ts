// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // URL del backend SQL (StarMotors_backend_sql)
  apiSqlUrl: 'http://localhost:9898',
  // URL del backend NoSQL (StarMotors_backend_no_sql)
  apiNoSqlUrl: 'http://localhost:8080',
  // Correo que recibe los informes enviados desde "Informe Concesionaria"
  reportEmail: 'correo@ejemplo.com',
  // Configuración de tu propio proyecto de Firebase (Consola de Firebase > Configuración del proyecto)
  firebaseConfig: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROYECTO.firebaseapp.com',
    projectId: 'TU_PROYECTO',
    storageBucket: 'TU_PROYECTO.appspot.com',
    messagingSenderId: 'TU_SENDER_ID',
    appId: 'TU_APP_ID',
    measurementId: 'TU_MEASUREMENT_ID'
  }
};
