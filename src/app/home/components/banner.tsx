"use client";

import pxToVw from "@/lib/dpi-converter";
import { useBannerStore } from "@/stores/banner-store";
import { colors } from "@/styles/colors";
import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";

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

const Banner = () => {
  const { banner, fetchBanner } = useBannerStore((state) => ({
    banner: state.banner,
    fetchBanner: state.fetchBanner
  }));

  useEffect(() => {
    if (banner === null) {
      fetchBanner();
    }
  }, [banner]);

  return (
    <Container>
      {banner && (
        <BannerImage
          src={banner?.image_url}
          alt="banner"
          width={390}
          height={80}
          onClick={() => window.open(banner?.redirect_url, "_blank")}
        />
      )}
    </Container>
  );
};

export default Banner;
