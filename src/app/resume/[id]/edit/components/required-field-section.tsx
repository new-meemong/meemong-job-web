import styled from "styled-components";
import ShortDescription from "./required-field-section-components/short-description";

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RequiredFieldSection = () => {
  return (
    <Contianer>
      <ShortDescription />
    </Contianer>
  );
};

export default RequiredFieldSection;
