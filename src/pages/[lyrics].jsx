// pages/lyrics.js
import { publicAxios } from '@/services/axios';
import { isEmpty, isEmptyArray } from '@/utility/Utils';
import axios from 'axios';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiEye, FiHeart } from 'react-icons/fi';

const LyricsPage = ({ data }) => {
    const router = useRouter()
    console.log(data)
    const lyricsData = data && !isEmptyArray(data) && data[0]
    // Dummy data (replace with your actual data)
    const title = lyricsData?.title
    const artist = lyricsData.artists
    const songDescription = !isEmpty(lyricsData?.metaDescription) ? lyricsData?.metaDescription : title
    const bpm = "";
    const tags = [lyricsData?.title, ...lyricsData?.tags, "Bible Notes", "Masih Songs", "Christian Song Lyric", "Lyrics"]
    const canonicalBaseURL = "https://www.biblenotes.in"
    const coverImage = `${canonicalBaseURL}/single-logo.png`
    const lyricsContent = lyricsData?.lyrics
    const languages = isEmptyArray(lyricsData?.languages) ? lyricsData?.languages : ["Hindi,English"]

    const currentPath = router.asPath;

    const readCount = lyricsData?.readCount === 0 ? 1000 : lyricsData?.readCount;
    const favoriteCount = lyricsData?.favoriteCount === 0 ? 1000 : lyricsData?.favoriteCount;

    const canonicalPageUrl = `${canonicalBaseURL}${currentPath}`

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
                <meta name="languages" content={languages.join(', ')} />
                <meta name="publisher" content="Bible Notes" />
                <meta name="author" content={lyricsData?.postedBy?.name} />

                <script type="application/ld+json">
                    {`
            {
              "@context": "http://schema.org",
              "@type": "Lyrics",
              "name": "${title}",
              "byArtist": "${artist[0].name}",
              "datePublished": "${moment(lyricsData?.createdAt).format('ll')}",
              "description": "${songDescription}",
              "image": "${coverImage}",
              "url": "${canonicalPageUrl}",
              "isFamilyFriendly": true
            }
          `}
                </script>

            </Head>

            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
                                <div className="inline-flex items-center gap-4 mr-3 text-sm text-gray-900 dark:text-white">
                                    <div className='h-20 hidden md:flex w-24.5 bg-gray-50 rounded-full  justify-center items-center'>
                                        <img src="/single-logo.png" alt="bible notes" className='w-10' />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{lyricsData?.title}</h2>
                                        {
                                            !isEmptyArray(artist) && artist.map((item, index) => (
                                                <p key={index} className="text-base text-gray-500 dark:text-gray-400">
                                                    {item?.artType}: <span className='text-graydark'>{item?.name}</span>
                                                </p>
                                            ))
                                        }
                                        <p className="text-base text-gray-500 dark:text-gray-400">
                                            <time dateTime={moment(lyricsData?.createdAt).format('ll')} title={moment(lyricsData?.createdAt).format('ll')}>{moment(lyricsData?.createdAt).format('ll')}</time>
                                        </p>
                                        <p className="text-base text-gray-500 dark:text-gray-400">
                                            {`Posted by ${lyricsData?.postedBy?.name} (${lyricsData?.postedBy?.role_name})`}
                                        </p>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{lyricsData?.title}</h1>
                        </header>
                        <div className='mt-10 text-gray-700' dangerouslySetInnerHTML={{ __html: lyricsContent }} />
                    </article>
                </div>
            </main>

        </>

    );
}


export async function getStaticPaths() {
    try {
        const res = await publicAxios.post('/lyrics/getAll')
        const data = res?.data?.data
        const paths = data.map(item => {
            return { params: { lyrics: item?.slug } }
        })

        return {
            paths: paths,
            fallback: false,
        }
    }
    catch (e) {
        console.log("Unable to create Path")
    }
}



export async function getStaticProps({ params }) {
    try {
        const res = await publicAxios.post('/lyrics/getAll', { slug: params.lyrics })
        console.log(res.data?.data)
        const data = res?.data?.data
        return { props: { data } }
    }
    catch (e) {
        console.log("Unable to get Song")
    }
}


export default LyricsPage

