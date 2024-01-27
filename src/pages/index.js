import Head from "next/head";
import HeroSection from "../components/home/HeroSection";
import LyricsSection from "@/components/home/LyricsSection";
import { publicAxios } from "@/services/axios";

function Home({ data }) {
  const title = "With Bible Notes You can get Lyrics of any Worship Song"
  const songDescription = "With Bible Notes You can get Lyrics of any Worship Song"
  const tags = ["Masih Lyrics", "Lyrics", "Bible Notes", "biblenotes.in", "Lyrics", "Hindi Lyrics", "Christian Song", "Jesus Songs", "blogs"]
  const canonicalPageUrl = "https://www.biblenotes.in"
  const coverImage = `${canonicalPageUrl}/single-logo.png`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={songDescription} />
        <meta name="keywords" content={tags.join(', ')} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalPageUrl} />
        <meta property="og:title" content={`${title}`} />
        <meta property="og:description" content={songDescription} />
        <meta property="og:image" content={coverImage} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={songDescription} />
        <meta property="twitter:image" content={coverImage} />
        <meta content="Bible Notes" property="og:site_name" />
        <meta name="publisher" content="Bible Notes" />
      </Head>
      <HeroSection data={data} />
      <LyricsSection data={data} />
    </>
  );
}



export async function getServerSideProps({ params }) {
  try {
    const res = await publicAxios.post('/lyrics/getAll')
    const data = res?.data?.data
    return { props: { data } }
  }
  catch (e) {
    console.log("Unable to create Path")
  }

}

export default Home

