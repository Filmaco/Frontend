export interface Data {
    denuncia_id: number,
    nome_usuario: number,
    video_id: number,
    status: 'pendente'|'resolvido'|'impedimento'
    criado_em: Date,
    status_video: 'investigando'|'bloqueado',
    titulo_video: string
}