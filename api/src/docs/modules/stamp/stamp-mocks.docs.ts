export const apiOperationDescription = `
## A interface associada a essa resposta é:

<code>interface StampInterface {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
</code>
`;

export const stampMock = {
  id: 1,
  name: 'Selo Teste',
  createdAt: '2024-04-20T20:12:53.000Z',
  updatedAt: '2024-04-20T20:12:53.000Z',
  deletedAt: null,
};

export const stampMock2 = {
  id: 2,
  name: 'Segundo Selo Teste',
  createdAt: '2024-04-20T20:12:53.000Z',
  updatedAt: '2024-04-20T20:12:53.000Z',
  deletedAt: null,
};
