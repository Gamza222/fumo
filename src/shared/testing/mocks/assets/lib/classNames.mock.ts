// Mock the classNames utility
export const mockClassNames = jest.fn(
  (base: string, _mods: object = {}, classes: string[] = []) => {
    // Simple implementation that joins base class with additional classes
    return [base, ...classes].filter(Boolean).join(' ');
  }
);
