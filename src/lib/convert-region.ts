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
  storeRegionsSiNames,
}: convertRegionProps): result[] => {
  const result: result[] = [];
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
  regionList: { key: string; value: string }[],
) => {
  let result = "";

  regionList.forEach((region) => {
    // "전체"가 포함된 경우 해당 value를 그대로 추가
    if (region.value.includes("전체")) {
      result += `${region.value}, `;
    } else {
      // "전체"가 아닌 경우 시의 짧은 이름을 찾아서 구와 함께 추가
      const siShort = siNmShort.find((si) =>
        region.key.startsWith(si.key),
      )?.value;
      result += `${siShort} ${region.value}, `;
    }
  });

  // 마지막에 붙은 ", "를 제거하고 반환
  return result.slice(0, -2);
};

// 서버의 gu, si 데이터 기준 화면에 뿌려지는 짧은 지역명으로 변환
export const convertToShortRegionFromQuery = (
  gu: string | null,
  si: string | null,
) => {
  const siNmShortMap = Object.fromEntries(
    siNmShort.map(({ key, value }) => [key, value]),
  );
  let result: string[] = [];

  // 시 데이터를 배열로 변환
  const siList = si ? si.split(",") : [];

  // 구 데이터를 처리 (부산광역시 중구 -> 부산 중구)
  const guSiSet = new Set();
  if (gu && gu.length !== 0) {
    const guList = gu.split(",");
    const shortGuList = guList.map((guItem) => {
      const [siKey, guKey] = guItem.split(" "); // "경기도 성남시" -> ["경기도", "성남시"]
      const shortSiName = siNmShortMap[siKey]; // "경기도" -> "경기"
      guSiSet.add(shortSiName); // "경기"를 guSiSet에 추가
      return `${shortSiName} ${guKey}`; // "경기 성남시"
    });
    result = result.concat(shortGuList);
  }

  // 시 데이터를 처리 (서울특별시 -> 서울 전체)
  if (si && si.length !== 0) {
    const shortSiList = siList
      .map((siItem) => {
        const shortSiName = siNmShortMap[siItem]; // "경기도" -> "경기"
        if (!guSiSet.has(shortSiName)) {
          // gu에 포함되지 않은 si만 추가
          return `${shortSiName} 전체`; // "서울특별시" -> "서울 전체"
        }
        return null;
      })
      .filter((item) => item !== null); // null 값 제거
    result = result.concat(shortSiList);
  }

  return result;
};
