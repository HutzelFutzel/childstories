export {};

declare global {
    interface Window {
        env: {
            NODE_ENV?: string;
            BACKEND_API?: string;
            BACKEND_SOCKET?: string;
            FIREBASE_CONFIG?: any;
            CLIENT_SECRET?: string;
        };
    }
}