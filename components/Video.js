export const Home = () => {
    const startRecording = () => {
        this.videoRecorderRef.current.handleStartRecording();
    }
    const stopRecording = () => {
        this.videoRecorderRef.current.handleStopRecording();
    }
}