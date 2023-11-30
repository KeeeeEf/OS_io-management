function calculateScheduling(trackStream, curTrack) {
    // Create a copy of the track stream
    const graphResults = trackStream.slice();

    // Add the current track to the beginning of the copied track stream
    graphResults.unshift(curTrack);

    // Initialize total seek time
    let totalSeekTime = 0;

    // Traverse the track stream to calculate seek time
    for (let i = 1; i < graphResults.length; i++) {
        // Calculate seek time for the current movement
        const seekTime = Math.abs(graphResults[i] - graphResults[i - 1]);

        // Add seek time to the total seek time
        totalSeekTime += seekTime;
    }

    // Return scheduling data and total seek time
    return { graphResults, totalSeekTime };
}

export { calculateScheduling };
