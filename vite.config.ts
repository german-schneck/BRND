import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import {nodePolyfills} from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(), 
    nodePolyfills({include: ['buffer']}),
    svgr({
      include: '**/*.svg?react',
    })
  ],
  resolve: {
    alias: {
      '@/*': path.resolve(__dirname, 'src/'),
      '@/hocs': path.resolve(__dirname, 'src/shared/hocs/'),
      '@/components': path.resolve(__dirname, 'src/shared/components/'),
      '@/assets': path.resolve(__dirname, 'src/shared/assets/'),
      '@/hooks': path.resolve(__dirname, 'src/shared/hooks/'),
      '@/styles': path.resolve(__dirname, 'src/shared/styles/'),
      '@/pages': path.resolve(__dirname, 'src/pages/'),
      '@/config': path.resolve(__dirname, 'src/config/'),
      '@/utils': path.resolve(__dirname, 'src/shared/utils/'),
    },
  },
});

