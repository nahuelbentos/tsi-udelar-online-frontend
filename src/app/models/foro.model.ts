import { TemaForo } from './tema-foro.model';

export class Foro {
  constructor(
    public titulo: string,
    public descripcion?: string,
    public foroId?: string,
    public temaForoLista?: TemaForo[]
    ){}
}
