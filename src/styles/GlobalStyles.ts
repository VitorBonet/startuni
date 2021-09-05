import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    background: var(--white-100);
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  *, button, input {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Fira Sans,Ubuntu,Oxygen,Oxygen Sans,Cantarell,Droid Sans,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Lucida Grande,Helvetica,Arial,sans-serif;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :root {
    --white: #FFFFFF;
    --white-100: #faf7ff;
    --black: #000;

    --gray-100: #e1e1e6;
    --gray-300: #a8a8b3;
    --gray-700: #323238;
    --gray-750: #232129;
    --gray-800: #29292e;
    --gray-850: #1f2729;
    --gray-900: #121214;
    --gray-950: #0d1117;

    --pink-50: #fbe6f1;
    --pink-200: #FFC8FB;
    --pink-300: #FB96F4;
    --pink-400: #FA7CF2;
    --pink-500: #FF5FF4;
    --pink-600: #FF40F2;
    
    --purple-30: #6b04ff1a;
    --purple-50: #6b04ff4d;
    --purple-100: #954cff;
    --purple-200: #C18FEC;
    --purple-300: #AE70E2;
    --purple-400: #A055E0;
    --purple-500: #963BE3;
    --purple-600: #8231C7;
    --purple-900: #39274b;

    --green-300: #91F2D9;
    --green-500: #0EEDB3;
    --green-700: #0b9772;
    
    --cyan-500: #61dafb;

    --blue-500: #0073b1;
    --blue-700: #1C1BAB;

    --yellow-500: #eba417; 

    --red-500: #E73F5D;
    --red-600: #c53030;

    --scaffold-layout-gutter: 1.2rem;
    --scaffold-layout-none-max-width: 576px;
    --scaffold-layout-md-max-width: 720px;
    --scaffold-layout-lg-max-width: 960px;
    --scaffold-layout-xl-max-width: 1128px;
  }
`;