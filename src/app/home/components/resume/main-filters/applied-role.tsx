import { useResumeListStore } from "@/stores/resume-list-store";
import DesignerTypeTab from "../../filters/designer-type-tab";
import { RoleKey } from "@/types/job-posting-keys";
import { useEffect } from "react";

const AppliedRole = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery
  }));

  const selectedDesignerType =
    getResumeFilterQuery("appliedRole") || "디자이너";

  const handleTabClick = (role: RoleKey) => {
    addResumeFilterQuery(`appliedRole=${role}`);
    if (role === "디자이너") {
      removeResumeFilterQuery("internExperienceYearNumber");
      removeResumeFilterQuery("preferredMonthlyEducationCount");
    } else if (role === "인턴") {
      removeResumeFilterQuery("DesignerExperienceYearNumber");
      removeResumeFilterQuery("preferredMonthlyEducationCount");
    }
  };

  useEffect(() => {
    addResumeFilterQuery(`appliedRole=${selectedDesignerType}`);
  }, [selectedDesignerType]);

  return (
    <DesignerTypeTab
      activeTab={selectedDesignerType as RoleKey}
      setActiveTab={handleTabClick}
    />
  );
};

export default AppliedRole;
