import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Sem isso, o DOM de um teste continua montado no próximo (queries como
// getByText passam a encontrar elementos duplicados entre testes).
afterEach(() => {
  cleanup();
});
