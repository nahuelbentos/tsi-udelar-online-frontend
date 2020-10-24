export class Curso {
  constructor(
    public nombre: string,
    public descripcion?: string,
    public usuarios?: Usuario[],
    public cursoId?: string
  ) {}
}

interface Usuario {
  userId: string;
  nombreCompleto: string;
  userName: string;
  email: string;
  phoneNumber: string;
}
