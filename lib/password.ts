import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hashes a password using bcrypt with a salt.
 * Bcrypt automatically handles salt generation and includes it in the resulting hash string.
 * @param password The plain text password to hash
 * @returns The hashed password string
 */
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password The plain text password
 * @param hashedPassword The stored hashed password
 * @returns True if they match, false otherwise
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
