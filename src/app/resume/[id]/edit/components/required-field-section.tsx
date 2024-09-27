import styled from "styled-components";
import ShortDescriptionInput from "./required-field-section-components/short-description-input";
import UserNameInput from "./required-field-section-components/user-name-input";
import pxToVw from "@/lib/dpi-converter";
import RegionsSelect from "./required-field-section-components/regions-select";

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${pxToVw(24)};
`;

const RequiredFieldSection = () => {
  return (
    <Contianer>
      <ShortDescriptionInput />
      <UserNameInput />
      <RegionsSelect />
    </Contianer>
  );
};

export default RequiredFieldSection;
