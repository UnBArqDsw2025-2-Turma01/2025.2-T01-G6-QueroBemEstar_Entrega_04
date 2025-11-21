export class Curtida {
  public readonly id?: number
  public autorId: number
  public receitaId: number
  public dataCurtida: Date

  private constructor(props: {
    id?: number
    autorId: number
    receitaId: number
    dataCurtida: Date
  }) {
    this.id = props.id
    this.autorId = props.autorId
    this.receitaId = props.receitaId
    this.dataCurtida = props.dataCurtida
  }

  public static create(props: { autorId: number; receitaId: number }): Curtida {
    return new Curtida({
      autorId: props.autorId,
      receitaId: props.receitaId,
      dataCurtida: new Date(),
    })
  }

  public static reBuild(props: {
    id: number
    autorId: number
    receitaId: number
    dataCurtida: Date
  }): Curtida {
    return new Curtida({
      id: props.id,
      autorId: props.autorId,
      receitaId: props.receitaId,
      dataCurtida: props.dataCurtida,
    })
  }
}
