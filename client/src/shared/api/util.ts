import { createAction } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const invalidateAccessToken = createAction(
	"session/invalidateAccessToken"
);

export function isFetchBaseQueryError(
	error: unknown
): error is FetchBaseQueryError {
	return typeof error === "object" && error != null && "status" in error;
}
