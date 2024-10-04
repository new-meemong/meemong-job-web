import { siNmShort, siSggList } from "@/types/location-type";

interface convertRegionProps {
  storeRegions: string;
  storeRegionsSiNames: string;
}
type result = {
  key: string;
  value: string;
};

export const convertRegion = ({
  storeRegions,
  storeRegionsSiNames
}: convertRegionProps): result[] => {
  let result: result[] = [];
  const regions = storeRegions.split(",").filter(Boolean); // 빈값 제거
  const siNames = storeRegionsSiNames.split(",").filter(Boolean);

  // 먼저 storeRegions에서 시와 구를 처리
  regions.forEach((region) => {
    const [, sggName] = region.split(" "); // "서울특별시 종로구" -> ["서울특별시", "종로구"]
    if (sggName) {
      result.push({ key: region, value: sggName });
    }
  });

  // storeRegionsSiNames에서 시만 있을 때, 해당 시의 구를 result에 추가하지 않았으면 첫 번째 구를 추가
  siNames.forEach((siName) => {
    const existingRegionsInSi = result.some((r) => r.key.includes(siName));

    // storeRegions에서 이미 처리된 구가 없을 경우만 추가
    if (!existingRegionsInSi) {
      const firstRegion = siSggList[siName]?.[0]; // 첫 번째 구 정보만 추가
      if (firstRegion) {
        result.push(firstRegion);
      }
    }
  });

  return result;
};

export const convertToShortRegion = (
  regionList: { key: string; value: string }[]
) => {
  let result = "";

  regionList.forEach((region) => {
    // "전체"가 포함된 경우 해당 value를 그대로 추가
    if (region.value.includes("전체")) {
      result += `${region.value}, `;
    } else {
      // "전체"가 아닌 경우 시의 짧은 이름을 찾아서 구와 함께 추가
      const siShort = siNmShort.find((si) =>
        region.key.startsWith(si.key)
      )?.value;
      result += `${siShort} ${region.value}, `;
    }
  });

  // 마지막에 붙은 ", "를 제거하고 반환
  return result.slice(0, -2);
};
