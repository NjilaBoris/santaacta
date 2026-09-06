import PoliticsFeed from "@/components/Blog";
import FeatureGrid from "@/components/Feature";
import HeroSlider from "@/components/Hero";
import LatestNews from "@/components/HeroArticle";
import HeroPortal from "@/components/HeroPortal";
import ImageCarousel from "@/components/Imagecarousel";
import ParliamentPoll from "@/components/Poll";
import StatsCards from "@/components/Quote";
import Skeleton from "@/components/Skeleton";
import WhatsAppButton from "@/components/Whatsaap";
import { Suspense } from "react";


const Home = () => {
  return (
    <>
      <HeroSlider />
      <StatsCards />
      <FeatureGrid />

      <Suspense fallback={<Skeleton />}>
        <LatestNews />
      </Suspense>
      <ParliamentPoll />
       <Suspense fallback={<Skeleton />}>
        <PoliticsFeed />
      </Suspense>
      <ImageCarousel/>
      {/* <PodcastSpotlight/> */}
      <HeroPortal />
      <WhatsAppButton />
    </>
  );
};

export default Home;