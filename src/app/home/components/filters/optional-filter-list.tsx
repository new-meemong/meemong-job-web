// import styled from "styled-components";
// import OptionalFilterExpand from "./.archive.options-filters/optional-filter-expand";
// import { useState } from "react";
// import OptionalFilterUnexpand from "./.archive.options-filters/optional-filter-unexpand";

// const Container = styled.div``;

// interface OptionalFilterListProps {
//   resetFilters: () => void;
// }

// const OptionalFilterList = ({ resetFilters }: OptionalFilterListProps) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpanded = () => {
//     setIsExpanded(!isExpanded);
//   };
//   return (
//     <Container>
//       {isExpanded ? (
//         <OptionalFilterExpand
//           resetFilters={resetFilters}
//           toggleExpanded={toggleExpanded}
//         />
//       ) : (
//         <OptionalFilterUnexpand
//           resetFilters={resetFilters}
//           toggleExpanded={toggleExpanded}
//         />
//       )}
//     </Container>
//   );
// };

// export default OptionalFilterList;
