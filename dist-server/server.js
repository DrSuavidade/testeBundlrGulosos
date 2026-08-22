import { app } from './app.js';
import { ENV } from './config/env.js';
import { autoMigrateAndSeed } from './config/db.js';
async function bootstrap() {
    console.log('🚀 Iniciando Pedra Mania (Servidor Unificado Fullstack)...');
    // Auto-criação de tabelas e seeds se PostgreSQL estiver ativo
    await autoMigrateAndSeed();
    const server = app.listen(ENV.PORT, () => {
        console.log(`✨ Servidor Pedra Mania Online em http://localhost:${ENV.PORT}`);
        console.log(`📦 CEP de Origem: ${ENV.STORE.ZIP_CODE} (${ENV.STORE.CITY}/${ENV.STORE.STATE})`);
        console.log(`🚚 Melhor Envio: Modo ${ENV.MELHOR_ENVIO.ENV}`);
        console.log(`🌐 Frontend & API integrados na mesma porta ${ENV.PORT}`);
    });
    return server;
}
bootstrap().catch((err) => {
    console.error('Falha crítica ao iniciar servidor:', err);
    process.exit(1);
});
