import styled from 'styled-components';

export const Modal = styled.div`
    position: absolute;
    top: 0;
    background-color: rgb(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 2;
`;

export const ModalMessage = styled.div`
    position: absolute;
    padding: 2em;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 250px;
    background-color: white;
    transform: translate(-50%, -50%);
    text-align: center;
`;