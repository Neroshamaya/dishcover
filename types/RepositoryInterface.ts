export interface WriteRepositoryInterface<DTO> {
    create(item: Omit<DTO, 'id'> ):Promise<void>
}

export interface FindQueryInterface<DTO> { 
    where: Partial<Omit<DTO, 'id'>>
    orderBy?: {
        [Property in keyof Omit<DTO, 'id'>]?: 'asc' | 'desc';
      }
    limit?: number   
}

export interface ReadRepositoryInterface<Model,DTO> {
    find(query: FindQueryInterface<DTO>): Promise<Model[]>
}

export type RepositoryInterface<Model,DTO> = WriteRepositoryInterface<DTO> & ReadRepositoryInterface<Model,DTO>