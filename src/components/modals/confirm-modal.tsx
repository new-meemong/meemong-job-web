import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import Modal from "react-modal";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: pxToVw(10),
    padding: 0
  }
};

const Container = styled.div`
  width: ${pxToVw(260)};
  height: ${pxToVw(140)};
  border-radius: ${pxToVw(10)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToVw(20)};
  padding: ${pxToVw(20)};
`;

const Content = styled.div`
  ${fonts.greyTextSemi16}
  white-space: pre-line;
  text-align: center;
`;

const ConfirmButton = styled.div`
  ${fonts.greyTextBold14}
`;

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  confirmText?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  message,
  confirmText = "확인"
}: ConfirmModalProps) => {
  const handleConfirmClick = () => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <Container>
        <Content>{message}</Content>
        <ConfirmButton onClick={handleConfirmClick}>
          {confirmText}
        </ConfirmButton>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;
