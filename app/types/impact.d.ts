export {};

declare global {
  interface Window {
    impactStat?: (...args: string[]) => void;
  }
}
