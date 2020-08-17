import '../styles.css';
import 'nprogress/nprogress.css';
import 'react-quill/dist/quill.bubble.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component { ...pageProps } />;
}