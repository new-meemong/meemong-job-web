"use client";

import { Suspense, useEffect } from "react";

import CenterSpinner from "@/components/spinners/CenterSpinner";
import Image from "next/image";
import Link from "next/link";
import { colors } from "@/styles/colors";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useBannerStore } from "@/stores/banner-store";
import { useSearchParams } from "next/navigation";

const Container = styled.div`
  margin-top: ${pxToVw(24)};
  width: 100%;
  height: ${pxToVw(80)};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.greyBackground};
`;

const BannerImage = styled(Image)`
  object-fit: contain;
  width: ${pxToVw(390)};
  height: ${pxToVw(80)};
`;

const BannerContent = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const { banner, fetchBanner } = useBannerStore((state) => ({
    banner: state.banner,
    fetchBanner: state.fetchBanner,
  }));

  useEffect(() => {
    if (banner === null) {
      fetchBanner();
    }
  }, [banner]);

  const handleBannerClick = () => {
    if (
      source === "app" &&
      typeof window !== "undefined" &&
      banner?.redirect_url
    ) {
      window.externalLink(banner?.redirect_url);
    }

    if (source === "web") {
      window.open(banner?.redirect_url, "_blank");
    }
  };

  return (
    <Container onClick={handleBannerClick}>
      {banner && (
        <BannerImage
          src={banner?.image_url}
          alt="banner"
          width={390}
          height={80}
          onClick={() => {
            // if (typeof window !== "undefined") {
            //   window.open(banner?.redirect_url, "_blank");
            // }
          }}
        />
      )}
    </Container>
  );
};

const Banner = () => {
  return (
    <Suspense fallback={<CenterSpinner />}>
      <BannerContent />
    </Suspense>
  );
};

export default Banner;
