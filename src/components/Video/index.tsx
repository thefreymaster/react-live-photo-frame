import React from 'react';

export const Video = () => {
    return (
        <video id="videoPlayer" autoPlay controls={false} width="100%" loop muted playsInline>
            <source src="/videos/troy.MOV" type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>
    )
}