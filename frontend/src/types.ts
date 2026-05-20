export type Audience =
 | "manager"
 | "peer"
 | "client"
 | "report";

export type Tone =
 | "professional"
 | "friendly"
 | "direct";

export type LoadingPhase =
 | "idle"
 | "analyzing"
 | "filtering"
 | "typing"
 | "done";

export type TranslateInput = {
 text:string;
 audience:string;
 tone:string;
};