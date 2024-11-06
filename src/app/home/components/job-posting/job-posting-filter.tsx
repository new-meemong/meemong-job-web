import AvailableOffDays from "./main-filters/available-off-days";
import EducationCost from "./main-filters/education-cost";
import Incentive from "./main-filters/incentive";
import InternSalary from "./main-filters/intern-salary";
import JobPostingLocation from "./main-filters/job-posting-location";
import JobPostingOptionalFilterList from "./optional/base/job-posting-optional-filter-list";
import MonthlyEducationCountDesigner from "./main-filters/monthly-education-count-designer";
import MonthlyEducationCountIntern from "./main-filters/monthly-education-count-intern";
import Role from "./main-filters/role";
import SettlementAllowance from "./main-filters/settlement-allowance";
import { colors } from "@/styles/colors";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div`
  margin: ${pxToVw(0)} ${pxToVw(24)};
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  padding: ${pxToVw(12)};
  width: calc(100% - ${pxToVw(48)});
  border-radius: ${pxToVw(5)};
`;

const JobPostingFilter = () => {
  const { getJobPostingFilterQuery } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
  }));
  const role = getJobPostingFilterQuery("role");

  return (
    <Container>
      <Role />
      <JobPostingLocation />
      {role === "디자이너" && <MonthlyEducationCountDesigner />}
      {role === "인턴" && <MonthlyEducationCountIntern />}
      {role === "인턴" && <EducationCost />}
      <AvailableOffDays />
      {role === "디자이너" && <SettlementAllowance />}
      {role === "디자이너" && <Incentive />}
      {role === "인턴" && <InternSalary />}

      <JobPostingOptionalFilterList />
    </Container>
  );
};

export default JobPostingFilter;
