import pxToVw from "@/lib/dpi-converter";
import { parseQueryString } from "@/lib/parse-query-string";
import { useResumeListStore } from "@/stores/resume-list-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const Button = styled.div`
  ${fonts.whiteBold14}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(48)};
  background-color: ${colors.purplePrimary};
  border-radius: ${pxToVw(5)};
  margin-bottom: ${pxToVw(28)};
`;

const ResumeSearchButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [text] = useState("인재 탐색하기");
  const { resumeFilterQueries, getResumeList } = useResumeListStore(
    (state) => ({
      resumeFilterQueries: state.resumeFilterQueries,
      getResumeList: state.getResumeList
    })
  );

  const handleClick = async () => {
    setIsLoading(true);
    const parsedQueries = parseQueryString(resumeFilterQueries);
    await getResumeList(parsedQueries);
    setIsLoading(false);
  };

  return (
    <Button onClick={handleClick}>
      {isLoading ? <ClipLoader color={colors.white} size={30} /> : text}
    </Button>
  );
};

export default ResumeSearchButton;
