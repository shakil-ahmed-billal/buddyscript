import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), "..", ".env") });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 8000,
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    better_auth_secret: process.env.BETTER_AUTH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    better_auth_base_url: process.env.BETTER_AUTH_BASE_URL,
    client_url: process.env.CLIENT_URL,
    email_sender: {
        smtp_user: process.env.EMAIL_SENDER_SMTP_USER,
        smtp_pass: process.env.EMAIL_SENDER_SMTP_PASS,
        smtp_host: process.env.EMAIL_SENDER_SMTP_HOST,
        smtp_port: process.env.EMAIL_SENDER_SMTP_PORT || '465',
        smtp_from: process.env.EMAIL_SENDER_SMTP_FROM,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }
};
