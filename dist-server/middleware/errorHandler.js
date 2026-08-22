export function errorHandler(err, req, res, next) {
    console.error('Unhandled Error:', err);
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';
    res.status(statusCode).json({
        error: message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}
