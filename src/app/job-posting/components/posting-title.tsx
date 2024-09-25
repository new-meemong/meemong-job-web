import { fonts } from "@/styles/fonts";
import { JobPostingType } from "@/types/job-posting-type";
import styled from "styled-components";

const Title = styled.h1`
  ${fonts.greyTextBold20}
`;

type PostingTitleProps = Pick<JobPostingType, "postingTitle">;

const PostingTitle = ({ postingTitle }: PostingTitleProps) => {
  return <Title>{postingTitle}</Title>;
};

export default PostingTitle;
