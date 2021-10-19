import { getVideosList } from "../../api";
import {
    useQuery,
} from 'react-query'
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router";

export const Video = () => {
    const { isLoading, data } = useQuery('videos', () => getVideosList());
    const { name }: any = useParams();
    if (isLoading) {
        return <Spinner size="xl" />
    }
    console.log(data)
    return (
        <video style={{ overflow: 'hidden !important' }} id="videoPlayer" autoPlay controls={false} width="100%" loop muted playsInline>
            <source src={`/videos/${name}`} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>
    )
}