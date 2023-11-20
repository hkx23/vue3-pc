if (import.meta.env.MODE === 'mock') {
  const mockDataRecord = import.meta.glob('./pages/**/*.ts', { eager: true });
  const list = Object.values(mockDataRecord).flatMap((mod) =>
    Array.isArray(mod.default) ? mod.default : [mod.default],
  );
  http.setMockData(list);
  http.openMock();
}
