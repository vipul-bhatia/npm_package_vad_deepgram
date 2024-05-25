import { useEffect, useRef } from "react";
import { useMicVAD } from "@ricky0123/vad-react";

const useVad = (config) => {
    const { userMedia, onSpeechStart, onSpeechEnd } = config;
    const vadRef = useRef();

    vadRef.current = useMicVAD({
        startOnLoad: true,
        stream: userMedia || undefined,
        onSpeechStart: () => onSpeechStart(),
        onSpeechEnd: () => onSpeechEnd(),
        positiveSpeechThreshold: 0.6,
        negativeSpeechThreshold: 0.6 - 0.45,
    });




    const start = () => {
        vadRef.current?.start();
    };

    const pause = () => {
        vadRef.current?.pause();
    };

    return { start, pause };
};

export default useVad;
