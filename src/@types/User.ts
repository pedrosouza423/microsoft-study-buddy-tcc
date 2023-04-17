export type UserDiscord = {
    id: number;
    username: string;
    avatar: string | null;
    discriminator: string;
}

export interface AdFormData {
    certificiation?: string;
    name?: string;
    weeksStudying?: number;
    discord?: string;
    weekDays?: number;
    hourStart?: string;
    hourEnd?: string;
    useVoiceChannel?: boolean;
}