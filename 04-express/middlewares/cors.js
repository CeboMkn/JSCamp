import cors from 'cors';

const ACEPTED_ORIGINS = [
    'http://localhost:5173'
];

export const corsMiddleware = ({ accept = ACEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            if (!origin || accept.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('Origen no permitido por CORS'));
        }
    })
}