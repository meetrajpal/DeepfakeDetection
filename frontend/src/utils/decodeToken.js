import {jwtDecode} from "jwt-decode";

/**
 * Decodes a JWT and extracts its payload.
 * @param {string} token - The JWT string.
 * @returns {object|null} - Decoded payload or null if the token is invalid.
 */
export function decodeToken(token) {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null;
    }
}