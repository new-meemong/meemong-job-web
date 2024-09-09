import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingTypes, SexType } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectSex = () => {
  const { sex, setSex } = useJobPostingEditStore();
  const sexs = Object.values(jobPostingTypes.sex);

  const handleSelect = (selectedOption: string) => {
    setSex(selectedOption as SexType);
  };
  return <Container></Container>;
};

export default SelectSex;
