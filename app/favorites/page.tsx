import Image from "next/image";
import { Metadata } from "next";
import Section1Favorites from "../components/favorites/Section1-Favortites";
import Section6Home from "../components/sectionHome/Section6-Home";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Nội dung Favorites",
};

export default function FavoritesPage() {
  return (
    <>
      <Section1Favorites />
      <Section6Home title=""/>
    </>
  );
}
