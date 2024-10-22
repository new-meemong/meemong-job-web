import pxToVw from "@/lib/dpi-converter";
// import { useJobPostingListStore } from "@/stores/job-posting-list-store";
// import { parseQueryString } from "@/lib/parse-query-string";
// import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { ClipLoader } from "react-spinners";
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
`;

const JobSearchButton = () => {
  const [text] = useState("매장 탐색하기");
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  // const { jobPostingFilterQueries } = useJobPostingListStore((state) => ({
  //   jobPostingFilterQueries: state.jobPostingFilterQueries
  //   // getJobPostingList: state.getJobPostingList
  // }));

  const handleClick = async () => {
    router.push("/search-result/job-posting-list");
    // setIsLoading(true);
    // try {
    //   const parsedQueries = parseQueryString(jobPostingFilterQueries);
    //   await getJobPostingList(parsedQueries);
    // } catch (error) {
    //   console.error(
    //     "Error parsing query string or fetching job postings:",
    //     error
    //   );
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Button onClick={handleClick}>
      {/* {isLoading ? <ClipLoader color={colors.white} size={30} /> : text} */}
      {text}
    </Button>
  );
};

export default JobSearchButton;
