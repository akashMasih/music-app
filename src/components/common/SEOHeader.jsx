import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react'

function SEOHeader(
    {
        title = "Comparify - Personal FInance",
        description = "Compare Loans, Credit Cards, Bank Accounts to start saving from today",
        keywords = "Comparify,Loan,Finance",
        author = "Comparify",
        coverImage = "/images/loans/home/hero.svg"
    }
) {
    const router = useRouter()
    const canonicalBaseURL = router.basePath
    const currentPath = router.asPath;
    const canonicalPageUrl = `${canonicalBaseURL}${currentPath}`
    const coverImageURl = `${canonicalBaseURL}${coverImage}`


    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            {/* <meta name="robots" content="index, follow" /> */}
            <link rel="canonical" href={canonicalPageUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={coverImageURl} />
            <meta property="og:type" content="financial services" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={coverImageURl} />
            <meta name="robots" content="noindex" />
        </Head>
    )
}

export default SEOHeader