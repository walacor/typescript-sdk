import BaseBanner from "@/components/BaseBanner";
import BaseBlogCards from "@/components/BaseBlogCards";
import DefaultLayout from "@/layout/default.layout";

export default function Home() {
  return (
    <DefaultLayout>
      <BaseBanner />
      <BaseBlogCards />
    </DefaultLayout>
  );
}
