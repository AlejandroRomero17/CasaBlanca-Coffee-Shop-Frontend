// src/utils/session.ts

/**
 * Devuelve el session_id único para el usuario (guest).
 * 1) Si existe en localStorage.session_id, lo devuelve.
 * 2) Si no, lo busca dentro de localStorage.cart-storage (Zustand).
 * 3) Si sigue sin haber, lo genera.
 * Siempre lo guarda en localStorage.session_id para que
 * getSessionId() devuelva siempre el mismo valor.
 */
export function getSessionId(): string {
  // 1) Intenta el campo directo
  let sessionId = localStorage.getItem("session_id");

  // 2) Si no hay, mira dentro de cart-storage
  if (!sessionId) {
    const raw = localStorage.getItem("cart-storage");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        sessionId = parsed.state?.sessionId;
      } catch {
        // si falla el parse, lo ignoramos
      }
    }
  }

  // 3) Si aún no hay sessionId, lo generamos
  if (!sessionId) {
    sessionId = `session-${Math.random().toString(36).substring(2, 9)}`;
  }

  // 4) Siempre lo escribimos de nuevo en localStorage.session_id
  localStorage.setItem("session_id", sessionId);
  return sessionId;
}

/**
 * Chequea si hay un token JWT en localStorage.
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token");
}

/**
 * Extrae el user_id guardado en localStorage (si existe).
 */
export function getUserId(): string | null {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    const u = JSON.parse(raw);
    return u?.id ?? null;
  } catch {
    return null;
  }
}
