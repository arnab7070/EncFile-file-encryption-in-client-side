import { Buffer } from "buffer";


// 🔐 Generate AES Key (PBKDF2 with SHA-512)
export async function generateAESKey(password: string, salt: string = "fixedSalt"): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, [
    "deriveBits",
    "deriveKey",
  ]);

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 200000,
      hash: "SHA-512",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// 🛡️ Encrypt Data
export async function encryptData(data: ArrayBuffer, key: CryptoKey): Promise<{ encrypted: string; iv: string }> {
  if (!(data instanceof ArrayBuffer)) {
    throw new Error("Data must be an ArrayBuffer.");
  }

  const iv = crypto.getRandomValues(new Uint8Array(12)); // IV must be exactly 12 bytes

  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);

  return {
    encrypted: Buffer.from(new Uint8Array(encrypted)).toString("base64"),
    iv: Buffer.from(iv).toString("base64"),
  };
}

// 🔓 Decrypt Data
export async function decryptData(encryptedBase64: string, key: CryptoKey, ivBase64: string): Promise<ArrayBuffer> {
  try {
    console.log("🔍 Decoding Encrypted Data and IV...");

    const encrypted = new Uint8Array(Buffer.from(encryptedBase64, "base64")); // Decode Base64
    const iv = new Uint8Array(Buffer.from(ivBase64, "base64")); // Decode IV

    if (iv.length !== 12) {
      throw new Error("Invalid IV length! IV must be exactly 12 bytes.");
    }

    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
    return decrypted;
  } catch (error) {
    console.error("❌ Decryption Failed!", error);
    throw new Error("Decryption failed! Invalid key, IV, or corrupted data.");
  }
}

