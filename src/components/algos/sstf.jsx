function calculateScheduling(trackStream, curTrack) {
    // Clone the trackStream array to avoid modifying the original array
    const tracks = [...trackStream];
    // Initialize variables
    const graphResults = [curTrack];
    let totalSeekTime = 0;

    // Helper function to find the index of the track with the shortest seek time
    const findShortestSeekTimeIndex = (tracks, curTrack) => {
        let minDistance = Infinity;
        let minIndex = -1;

        for (let i = 0; i < tracks.length; i++) {
            const distance = Math.abs(tracks[i] - curTrack);
            if (distance < minDistance) {
                minDistance = distance;
                minIndex = i;
            }
        }

        return minIndex;
    };

    // SSTF algorithm main loop
    while (tracks.length > 0) {
        const nextIndex = findShortestSeekTimeIndex(tracks, curTrack);
        const nextTrack = tracks[nextIndex];

        // Update total seek time
        totalSeekTime += Math.abs(nextTrack - curTrack);

        // Update current track
        curTrack = nextTrack;

        // Remove the processed track from the array
        tracks.splice(nextIndex, 1);

        // Save the current track in graphResults
        graphResults.push(curTrack);
    }

    return { graphResults, totalSeekTime };
}

export { calculateScheduling };
