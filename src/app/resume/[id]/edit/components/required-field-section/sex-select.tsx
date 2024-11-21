import EditResumeOptonSingleSelect from "./base/edit-resume-option-single-select";
import { RoleKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SexSelect = () => {
  const { sex, setSex } = useResumeEditStore((state) => ({
    sex: state.sex,
    setSex: state.setSex,
  }));
  const options = [
    { key: "남자", value: "남자" },
    { key: "여자", value: "여자" },
  ];

  const handleSelect = (selectedOption: string | null) => {
    setSex(selectedOption as RoleKeyResume);
  };

  return (
    <Container>
      <EditResumeOptonSingleSelect
        label={"성별*"}
        options={options}
        selectedOption={sex}
        onSelect={handleSelect}
        errorMessage="성별을 선택해주세요."
        isError={!sex}
      />
    </Container>
  );
};

export default SexSelect;
