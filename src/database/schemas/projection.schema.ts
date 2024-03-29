import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// had to change this in order for abstractRepository to work
// export type ProjectionDocument = HydratedDocument<Projection>;
export type ProjectionDocument = Projection & Document;

@Schema({ timestamps: true })
export class Projection {
  @Prop()
  projectionId: number;

  @Prop()
  lastName: string;

  @Prop()
  firstName: string;

  @Prop()
  value: number;

  @Prop()
  team: string;

  @Prop()
  position: string;

  @Prop()
  opponent: string;

  @Prop()
  minutes: number;

  @Prop()
  points: number;

  @Prop()
  threes: number;

  @Prop()
  rebounds: number;

  @Prop()
  assists: number;

  @Prop()
  steals: number;

  @Prop()
  blocks: number;

  @Prop()
  turnovers: number;

  @Prop()
  twos: number;

  @Prop()
  freeThrows: number;

  @Prop()
  freeThrowsMissed: number;

  @Prop()
  fieldGoals: number;

  @Prop()
  fieldGoalsMissed: number;

  @Prop()
  doubleDoubles: number;

  @Prop()
  tripleDoubles: number;

  @Prop()
  injury: string;

  @Prop()
  pointsScored: number;

  @Prop()
  granica: number;
}

export const ProjectionSchema = SchemaFactory.createForClass(Projection);
