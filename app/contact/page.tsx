import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Nội dung Contact",
};

export default function ContactPage() {
  return (
    <>
      <h1 className="text-main font-[500] text-[40px] flex justify-center">Contact</h1>
    </>
  );
}
