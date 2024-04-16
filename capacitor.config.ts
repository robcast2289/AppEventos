import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {

  
  appId: 'edu.galileo.eventosapp',
  appName: 'EventosApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '213739652036-amp7o7dk2nfecb9mqi4a6m664vq5h2lr.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  },
};

export default config;
