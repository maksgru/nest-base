import * as crypto from 'crypto';
import asyncLocalStorage from '../utils/async-local-storage';

const traceIdMiddleware = (_: unknown, __: unknown, next: () => void): void => {
  asyncLocalStorage.run(new Map(), () => {
    asyncLocalStorage.getStore().set('traceId', crypto.randomUUID());
    next();
  });
};

export default traceIdMiddleware;
