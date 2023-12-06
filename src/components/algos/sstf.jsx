function calculateScheduling(trackStream, curTrack) {
    const tracks = [...trackStream];
    const graphResults = [curTrack];
    let totalSeekTime = 0;

    const getSSTF = (tracks, curTrack) => {
        let minDist = Infinity;
        let minLoc = -1;

        for (let i = 0; i < tracks.length; i++) {
            const distance = Math.abs(tracks[i] - curTrack);

            if (tracks[i] === 48) {
                return i;
            }

            if (distance < minDist) {
                minDist = distance;
                minLoc = i;
            }
        }

        return minLoc;
    };

    while (tracks.length > 0) {
        const nextLoc = getSSTF(tracks, curTrack);
        const nextTrack = tracks[nextLoc];

        totalSeekTime += Math.abs(nextTrack - curTrack);
        curTrack = nextTrack;

        tracks.splice(nextLoc, 1);
        graphResults.push(curTrack);
    }

    return { graphResults, totalSeekTime };
}

export { calculateScheduling };
