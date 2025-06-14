
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f9730c1071cc46fd86f6ac0e86541c6e',
  appName: 'craftwrite-cloud-hub',
  webDir: 'dist',
  server: {
    url: 'https://f9730c10-71cc-46fd-86f6-ac0e86541c6e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
