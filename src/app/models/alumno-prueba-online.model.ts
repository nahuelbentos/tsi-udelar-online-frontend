import { PruebaOnline } from "./prueba-online.model";
import { Usuario } from "./usuario.model";

export class AlumnoPruebaOnline {
  constructor(
    public alumnoId: string,
    public alumno: Usuario,
    public pruebaOnlineId: string,
    public PruebaOnlineData: PruebaOnline,
    public evaluacion: string,
    public fechaInicio: Date,
    public fechaFin: Date,
    public fechaExpiracion: Date,
    public nota: number,
    public inscripto: boolean
  ) {}
}