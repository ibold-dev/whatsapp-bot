export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_APIKEY: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
