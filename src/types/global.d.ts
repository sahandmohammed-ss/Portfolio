// Global type declarations

interface Window {
  turnstile?: {
    getResponse: () => string;
    reset: () => void;
    render: (element: string | HTMLElement, options: any) => void;
  };
}
