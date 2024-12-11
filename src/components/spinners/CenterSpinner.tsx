import { ClipLoader } from "react-spinners";
import { colors } from "@/styles/colors";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterSpinner = () => {
  return (
    <SpinnerWrapper>
      <ClipLoader color={colors.purplePrimary} size={30} />
    </SpinnerWrapper>
  );
};

export default CenterSpinner;
