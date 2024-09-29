import { useResumeEditStore } from "@/stores/resume-edit-store";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import ResumeEditInput from "../base/resume-edit-input";

const Container = styled.div``;

const Mbti = () => {
  const { mbti, setMbti } = useResumeEditStore((state) => ({
    mbti: state.mbti,
    setMbti: state.setMbti
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMbti(e.target.value);
  };
  return (
    <Container>
      <DropDownItem label={"MBTI"}>
        <ResumeEditInput
          value={mbti || ""}
          onChange={handleChange}
          placeholder="MBTI를 입력해주세요"
          type="text"
        />
      </DropDownItem>
    </Container>
  );
};

export default Mbti;
