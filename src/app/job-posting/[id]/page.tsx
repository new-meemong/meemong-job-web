import { IMAGE_STORAGE_URL } from "@/apis/consts";
import Metadata from "@/app/resume/[id]/components/metadata";
import PageContent from "./PageContent";
import { getJobPosting } from "@/apis/job-postings";

export default async function JobPostingPage({
  params,
}: {
  params: { id: string };
}) {
  const jobPostingId = params.id;
  const { data } = await getJobPosting(jobPostingId);

  if (!data) {
    return (
      <>
        <Metadata
          ogUrl={`https://meemong-job-web.vercel.app/job-posting/${jobPostingId}`}
          ogImage={``}
          ogTitle={"없음 메타데이터"}
          ogDescription="존재하지 않는 이력서입니다."
        />
        <div>존재하지 않는 공고입니다.</div>
      </>
    );
  }

  return (
    <>
      <Metadata
        ogImage={`${IMAGE_STORAGE_URL}${data.JobPostingsStoreImages?.[0]?.uri}`}
        ogTitle={data.postingTitle}
        ogDescription={data.description}
        ogUrl={`https://meemong-job-web.vercel.app/job-posting/${jobPostingId}`}
      />
      <PageContent initialJobPosting={data} />
    </>
  );
}
