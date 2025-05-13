export interface Data {
    video_id: number
    nome: string
    visualizacoes:number
    criado_em: Date
    imagem: string 
    atualizado_em: Date 
    status: 'ativo' | 'inativo'
}