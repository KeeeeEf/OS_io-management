function calculateScheduling(trackStream, curTrack) {
    const greaterTracks = trackStream
        .filter(track => track > curTrack && track < 199)
        .sort((a, b) => a - b);

    const lesserTracks = trackStream
        .filter(track => track < curTrack)
        .sort((a, b) => a - b);

    const graphResults = [curTrack, ...greaterTracks, ...lesserTracks];

    let totalSeekTime = 0;
    for (let i = 1; i < graphResults.length; i++) {
        totalSeekTime += Math.abs(graphResults[i] - graphResults[i - 1]);
    }

    return { graphResults, totalSeekTime };
}

export { calculateScheduling };