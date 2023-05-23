import { z } from "zod";

/**
 * ✅ DX Best practice (Type safe)
 *
 * Validate env variables with zod
 */
const envVariables = z.object({
	VITE_API_ENDPOINT: z.string().url(),
	VITE_API_DELAY: z
		.string()
		.regex(/^\d+$/, { message: "Must be a positive number" })
		.optional(),
	VITE_JWT_SECRET: z.string().min(1),
});

envVariables.parse(import.meta.env);

declare global {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface ImportMetaEnv extends z.infer<typeof envVariables> {}
}

export const config = {
	API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
	API_DELAY: Number(import.meta.env.VITE_API_DELAY) || 100,
	JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
} as const;
