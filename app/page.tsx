import { Metadata } from "next";
import { Section1Home } from "./components/sectionHome/Section1-Home";
import Section2Home from "./components/sectionHome/Section2_Home";
import Section3Home from "./components/sectionHome/Section3-Home";
import Section4Home from "./components/sectionHome/Section4-Home";
import Section5Home from "./components/sectionHome/Section5-home";
import Section6Home from "./components/sectionHome/Section6-Home";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Nội dung trang chủ",
};

export default function Home() {
  return (
    <>
      {/* Section-1 */}
      <Section1Home />
      <Section2Home />
      <Section3Home />
      <Section4Home />
      <Section5Home />
      <Section6Home title="Latest Recipes"/>
      {/*End Section-1 */}
    </>
  );
}
