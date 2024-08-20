export const apiOperationDescription = `
## A interface associada a essa resposta é:

<code>interface UserInterface {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
</code>
`;

export const userMock = {
  id: 1,
  username: 'Usuário Teste',
  email: 'email@teste.com',
  createdAt: '2024-04-20T20:12:53.000Z',
  updatedAt: '2024-04-20T20:12:53.000Z',
  deletedAt: null,
};

export const userMock2 = {
  id: 2,
  username: 'Usuário Teste 2',
  email: 'email@teste2.com',
  createdAt: '2024-04-20T20:12:53.000Z',
  updatedAt: '2024-04-20T20:12:53.000Z',
  deletedAt: null,
};
