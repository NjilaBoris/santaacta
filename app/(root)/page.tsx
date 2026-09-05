import PoliticsFeed from "@/components/Blog";
import FeatureGrid from "@/components/Feature";
import HeroSlider from "@/components/Hero";
import LatestNews from "@/components/HeroArticle";
import HeroPortal from "@/components/HeroPortal";
import ImageCarousel from "@/components/Imagecarousel";
import ParliamentPoll from "@/components/Poll";
import StatsCards from "@/components/Quote";
import WhatsAppButton from "@/components/Whatsaap";


const Home = () => {
  return (
    <>
      <HeroSlider />
      <StatsCards />
      <FeatureGrid />
      <LatestNews />
      <ParliamentPoll />
      <PoliticsFeed />
      <ImageCarousel/>
      {/* <PodcastSpotlight/> */}
      <HeroPortal />
      <WhatsAppButton />
    </>
  );
};

export default Home;