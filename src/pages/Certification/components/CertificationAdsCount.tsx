import React, { useEffect, useState } from "react";
import { countAdsByGame } from "../index";

interface CertificationAdsCountProps {
  certificationId: number;
}

export const CertificationAdsCount: React.FC<CertificationAdsCountProps> = ({ certificationId }) => {
  const [adsCount, setAdsCount] = useState(0);

  useEffect(() => {
    setAdsCount(countAdsByGame(certificationId));
  }, [certificationId]);

  return <div>Número de anúncios: {adsCount}</div>;
};
