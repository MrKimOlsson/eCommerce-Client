import React from 'react';
import '../../styles/shared/modal.scss'; // Optional: Include your custom styles

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode; // This can accept any React node (element, string, etc.)
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;