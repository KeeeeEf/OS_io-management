function calculateScheduling(trackStream, curTrack) {
    const graphResults = trackStream.slice();
    graphResults.unshift(curTrack);
    
    let totalSeekTime = 0;
    for (let i = 1; i < graphResults.length; i++) {
        const seekTime = Math.abs(graphResults[i] - graphResults[i - 1]);
        totalSeekTime += seekTime;
    }

    return { graphResults, totalSeekTime };
}

export { calculateScheduling };
