import { getVideosList } from "../../api";
import {
    useQuery,
} from 'react-query'
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router";

export const Video = () => {
    const { name }: any = useParams();
    const { isLoading, data } = useQuery(['videos', name], () => getVideosList());
    if (isLoading) {
        return <Spinner size="xl" />
    }
    console.log(data)
    return (
        <video style={{ overflow: 'hidden !important', filter: 'sepia(100%)', WebkitFilter: 'sepia(100%)' }} id="videoPlayer" autoPlay controls={false} width="100%" loop muted playsInline>
            <source src={`/videos/${name}.mp4`} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>
    )
}