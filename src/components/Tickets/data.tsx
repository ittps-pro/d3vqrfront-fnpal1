const defaultData: DataSourceType[] = new Array(20).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `SD911-000${index}`,
    decs: 'Ticket short description',
    state: 'open',
    created_at: 1590486176000,
    recipment: "ptrufanov",
    site: "Z440",
    type: "1",
  };
});
