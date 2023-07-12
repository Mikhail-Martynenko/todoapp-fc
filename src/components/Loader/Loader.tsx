import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

const Loader: React.FC = () => {
    return (
        <LoaderContainer>
            <Spinner />
        </LoaderContainer>
    );
};

export default Loader;