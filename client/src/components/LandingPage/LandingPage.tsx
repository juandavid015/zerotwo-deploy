import { useEffect } from "react";

import Header from "./Header";
import BenefitSection from "./BenefitSection";
import DispositiveSection from "./DispositiveSection";
import PlanCards from "./PlanCards";

export default function LandingPage(): JSX.Element {

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  })

  return (
    <div>
      <Header></Header>
      <BenefitSection></BenefitSection>
      <DispositiveSection></DispositiveSection>
      <PlanCards></PlanCards>
    </div>
  );
}
