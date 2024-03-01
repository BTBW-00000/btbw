import { Stream } from "misskey-js";


export class StreamManager {
    static #streams: Map<string, Stream> = new Map();

    static use(origin: string, token: string) {
        if (!this.#streams.has(origin)) {
            const s = new Stream(origin, { token: token });
            setInterval(() => s.heartbeat(), 60 * 1000);
            this.#streams.set(origin, s);
        }
        return this.#streams.get(origin)!;
    }
}
