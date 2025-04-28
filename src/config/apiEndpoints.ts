
// for online containers the backend api env variable is given. 
// fallback to localhost for development
const API_BASE_URL = window.env?.BACKEND_API || 'http://localhost:8080';

export const STORY_ENDPOINTS = {
   POST_STORY: `${API_BASE_URL}/stories/new`,
}
