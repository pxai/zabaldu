import { useState } from 'react';
import { Modal, ModalMessage } from './modal.styles';

const ModalComponent = ({message}) => {
    const [visible, setVisible] = useState(true);

    return visible 
        ? (
            <Modal>
                <div onClick={() => setVisible(false)}>x</div>
                <ModalMessage>{message}</ModalMessage>
            </Modal>
        )
        : null;
};

export default ModalComponent;