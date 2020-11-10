export class TemaForo {
    constructor(
        public asunto?: string,
        public mensaje?: string,
        public file?: string,
        public emisor?: string,
        public subrscripcionADiscusion?: boolean,
    ) { }
}