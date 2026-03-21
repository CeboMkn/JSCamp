import cors from 'cors';

const ACEPTED_ORIGINS = [
    'http://localhost:5173'
];

export const corsMiddleware = ({ acceptedOrigins = ACEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            if (acceptedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('Origen no permitido por CORS'));
        }
    })
}