import '@testing-library/jest-dom'

// Silenciar todos os métodos de console durante os testes
const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    trace: console.trace
};

// Substituir todos os métodos de console por funções vazias
console.log = () => { };
console.info = () => { };
console.warn = () => { };
console.error = () => { };
console.debug = () => { };
console.trace = () => { };

// Restaurar console após os testes (opcional, para debug se necessário)
global.afterAll(() => {
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.debug = originalConsole.debug;
    console.trace = originalConsole.trace;
});