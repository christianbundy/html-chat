// Types
export const POST_MESSAGE = 'POST_MESSAGE';

// Creators
export function postMessage(message) {
  return { type: POST_MESSAGE, message }
}
