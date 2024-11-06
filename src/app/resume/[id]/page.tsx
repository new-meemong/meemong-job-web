import { IMAGE_STORAGE_URL } from "@/apis/consts";
import Metadata from "./components/metadata";
import PageContent from "./page-content";
import { getResume } from "@/apis/resumes";

export default async function ResumePage({
  params,
}: {
  params: { id: string };
}) {
  const resumeId = params.id;
  const { data } = await getResume(resumeId);

  if (!data) {
    return (
      <>
        <Metadata
          ogUrl={`https://meemong-job-web.vercel.app/resume/${resumeId}`}
          ogImage={``}
          ogTitle={"없음 메타데이터"}
          ogDescription="존재하지 않는 이력서입니다."
        />
        <div>존재하지 않는 이력서입니다.</div>
      </>
    );
  }

  return (
    <>
      <Metadata
        ogImage={`${IMAGE_STORAGE_URL}${data.profileImageUri}`}
        ogTitle={data.userName}
        ogDescription={data.shortDescription}
        ogUrl={`https://meemong-job-web.vercel.app/resume/${resumeId}`}
      />
      <PageContent resume={data} />
    </>
  );
}
