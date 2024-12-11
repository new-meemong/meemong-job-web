import Modal from "react-modal";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
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
    padding: 0,
    zIndex: 100,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // 어두운 배경 설정
    zIndex: 100,
  },
};

const Container = styled.div`
  width: ${pxToVw(260)};
  height: ${pxToVw(140)};
  border-radius: ${pxToVw(10)};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`;

const Content = styled.div`
  ${fonts.greyTextSemi16}
  white-space: pre-line;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ConfirmButton = styled.div<{ $isWarning: boolean }>`
  ${fonts.greyTextBold14}
  width: 50%;
  height: ${pxToVw(40)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $isWarning }) => ($isWarning ? colors.red : colors.greyText)};
`;

const CancelButton = styled.div`
  ${fonts.greyTextBold14}
  width: 50%;
  height: ${pxToVw(40)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isWarning?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "확인",
  cancelText = "취소",
  isWarning = false,
}: ConfirmModalProps) => {
  const handleConfirmClick = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <Container>
        <ContentContainer>
          <Content>{message}</Content>
        </ContentContainer>
        <ButtonContainer>
          <ConfirmButton onClick={handleConfirmClick} $isWarning={isWarning}>
            {confirmText}
          </ConfirmButton>
          <CancelButton onClick={onClose}>{cancelText}</CancelButton>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;
