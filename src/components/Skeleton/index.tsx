import styled from 'styled-components';

export default styled.div`
    background-image: linear-gradient(
      -90deg, 
      #e7edf11c 0%,
      #f8f8f81c 50%,
      #e7edf11f 100%
    );


  background-size: 400% 400%;
  animation: shimmer 1.2s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: -135% 0%;
    }
  }

  &.white {
    background-image: linear-gradient(-90deg, #ffffff1c 0%, #e7edf11c 50%, #ffffff1c 100%);
  }
`;