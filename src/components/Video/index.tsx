import { getVideosList } from "../../api";
import {
    useQuery,
} from 'react-query'
import { Spinner } from "@chakra-ui/react";

export const Video = () => {
    const { isLoading, data } = useQuery('videos', () => getVideosList());
    if (isLoading) {
        return <Spinner size="xl" />
    }
    console.log(data)
    return (
        <video id="videoPlayer" autoPlay controls={false} width="100%" loop muted playsInline>
            <source src={`/videos/${data![0]}`} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>
    )
}