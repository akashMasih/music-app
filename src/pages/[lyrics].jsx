// pages/lyrics.js
import { publicAxios } from '@/services/axios';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiEye, FiHeart } from 'react-icons/fi';

const LyricsPage = () => {
    const router = useRouter()
    // Dummy data (replace with your actual data)
    const title = "Song Title";
    const artist = "Artist Name";
    const songNote = "A note about the song";
    const bpm = "120 BPM";
    const tags = ["Pop", "Love", "Melody"];
    const coverImage = "/path/to/cover-image.jpg";
    const lyricsContent = "<p>This is the lyrics content.</p>";
    const canonicalBaseURL = "https://www.biblenotes.in"
    const currentPath = router.asPath;

    const readCount = 1000;
    const favoriteCount = 500;

    const canonicalPageUrl = `${canonicalBaseURL}${currentPath}`

    return (
        <>
            <Head>
                <title>{`${title} by ${artist}`}</title>
                <meta name="description" content={songNote} />
                <meta name="keywords" content={tags.join(', ')} />
                <meta name="author" content={artist} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalPageUrl} />
                <meta property="og:title" content={`${title} by ${artist}`} />
                <meta property="og:description" content={songNote} />
                <meta property="og:image" content={coverImage} />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={`${title} by ${artist}`} />
                <meta property="twitter:description" content={songNote} />
                <meta property="twitter:image" content={coverImage} />


            </Head>

            <div>
                {/* Lyrics Content */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{title}</h1>
                    <h2 className="text-2xl text-gray-600 mb-4">{artist}</h2>
                    <p className="text-lg mb-4">{songNote}</p>
                    <div className="flex items-center mb-4">
                        <span className="mr-4">{bpm}</span>
                        {tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-sm mr-2">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <img src={coverImage} alt="Cover Image" className="w-full mb-4" />
                    <div dangerouslySetInnerHTML={{ __html: lyricsContent }} />
                </div>

                {/* Additional Information */}
                <div className="flex justify-between items-center">
                    <div>
                        <span className="mr-4 flex items-center">
                            <FiEye className="mr-2" /> {readCount}
                        </span>
                        <span className="flex items-center">
                            <FiHeart className="mr-2" /> {favoriteCount}
                        </span>
                    </div>
                    <div className="flex items-center">
                        {tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-sm mr-2">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div >
        </>
    );
}


export async function getStaticPaths() {
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

export async function getStaticProps({ params }) {
    console.log(params)
    const res = await publicAxios.post('/lyrics/getAll', { slug: params.lyrics })
    console.log(res.data?.data)
    const data = res?.data?.data
    return { props: { data } }
}


export default LyricsPage

