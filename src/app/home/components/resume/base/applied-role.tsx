import { useResumeListStore } from "@/stores/resume-list-store";
import DesignerTypeTab from "../../filters/designer-type-tab";
import { RoleKey } from "@/types/job-posting-keys";

const AppliedRole = () => {
  const { getResumeFilterQuery, addResumeFilterQuery } = useResumeListStore(
    (state) => ({
      getResumeFilterQuery: state.getResumeFilterQuery,
      addResumeFilterQuery: state.addResumeFilterQuery
    })
  );

  const selectedDesignerType =
    getResumeFilterQuery("appliedRole") || "디자이너";

  const handleTabClick = (role: RoleKey) => {
    addResumeFilterQuery(`appliedRole=${role}`);
  };

  return (
    <DesignerTypeTab
      activeTab={selectedDesignerType as RoleKey}
      setActiveTab={handleTabClick}
    />
  );
};

export default AppliedRole;
