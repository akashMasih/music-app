import LyricsForm from "@/components/users/LyricsForm";
import withAuth from "@/hooks/withAuth";

const AddLyrics = () => {
    return (
        <LyricsForm />
    )
}

export default withAuth(AddLyrics, ["1"]);