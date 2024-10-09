import DesignerTypeTab from "../../filters/designer-type-tab";
import { RoleKey } from "@/types/job-posting-keys";
import { useEffect } from "react";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Role = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery
  }));

  const selectedDesignerType = getJobPostingFilterQuery("role") || "디자이너";

  const handleTabClick = (role: RoleKey) => {
    addJobPostingFilterQuery(`role=${role}`);
    // if (role === "디자이너") {
    //   removeJobPostingFilterQuery("internExperienceYearNumber");
    //   removeJobPostingFilterQuery("preferredMonthlyEducationCount");
    //   removeJobPostingFilterQuery("designerPromotionPeriod");
    // } else if (role === "인턴") {
    //   removeJobPostingFilterQuery("designerExperienceYearNumber");
    //   removeJobPostingFilterQuery("preferredMonthlyEducationCount");
    //   removeJobPostingFilterQuery("salesLast3MonthsAvg");
    // }
    if (role === "디자이너") {
      removeJobPostingFilterQuery("monthlyEducationCount");
      removeJobPostingFilterQuery("educationCost");
      removeJobPostingFilterQuery("designerPromotionPeriod");
      removeJobPostingFilterQuery("internExperienceYearNumber");
      removeJobPostingFilterQuery("isOnsiteManager");
      removeJobPostingFilterQuery("isExistedFourInsurances");
      removeJobPostingFilterQuery("isExistedRetirementPay");
    } else if (role === "인턴") {
      removeJobPostingFilterQuery("monthlyEducationCount");
      removeJobPostingFilterQuery("settlementAllowance");
      removeJobPostingFilterQuery("incentive");
      removeJobPostingFilterQuery("isExistedEducationSupport");
      removeJobPostingFilterQuery("designerExperienceYearNumber");
      removeJobPostingFilterQuery("salesLast3MonthsAvg");
    }
  };

  useEffect(() => {
    addJobPostingFilterQuery(`role=${selectedDesignerType}`);
  }, [selectedDesignerType]);

  return (
    <DesignerTypeTab
      activeTab={selectedDesignerType as RoleKey}
      setActiveTab={handleTabClick}
    />
  );
};

export default Role;
