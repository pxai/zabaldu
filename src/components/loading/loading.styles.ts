import styled, {keyframes} from 'styled-components';

export const Loading = styled.div`
    position: absolute;
    top: 0;
    background-color: rgb(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;

const StyledLoaderInnerFrame = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

export const LoadingMessage = styled.div`
    width: 71px;
    height: 71px;

    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${StyledLoaderInnerFrame} .8s infinite linear
`;


