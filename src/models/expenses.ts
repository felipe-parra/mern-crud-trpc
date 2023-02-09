import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { collection: 'expenses', timestamps: true } })
export class Expense {
  @prop({ type: String })
  name!: string

  @prop({ type: Number })
  amount!: number

  @prop({ type: Boolean })
  validated: boolean = false
}

export default getModelForClass(Expense)
