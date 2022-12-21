import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// had to change this in order for abstractRepository to work
// export type ProjectionDocument = HydratedDocument<Projection>;
export type ProjectionDocument = Projection & Document;

@Schema({ timestamps: true })
export class Projection {
  @ApiProperty()
  @Prop()
  projectionId: number;

  @ApiProperty()
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop()
  firstName: string;

  @ApiProperty()
  @Prop()
  value: number;

  @ApiProperty()
  @Prop()
  team: string;

  @ApiProperty()
  @Prop()
  position: string;

  @ApiProperty()
  @Prop()
  opponent: string;

  @ApiProperty()
  @Prop()
  minutes: number;

  @ApiProperty()
  @Prop()
  points: number;

  @ApiProperty()
  @Prop()
  threes: number;

  @ApiProperty()
  @Prop()
  rebounds: number;

  @ApiProperty()
  @Prop()
  assists: number;

  @ApiProperty()
  @Prop()
  steals: number;

  @ApiProperty()
  @Prop()
  blocks: number;

  @ApiProperty()
  @Prop()
  turnovers: number;

  @ApiProperty()
  @Prop()
  twos: number;

  @ApiProperty()
  @Prop()
  freeThrows: number;

  @ApiProperty()
  @Prop()
  freeThrowsMissed: number;

  @ApiProperty()
  @Prop()
  fieldGoals: number;

  @ApiProperty()
  @Prop()
  fieldGoalsMissed: number;

  @ApiProperty()
  @Prop()
  doubleDoubles: number;

  @ApiProperty()
  @Prop()
  tripleDoubles: number;

  @ApiProperty()
  @Prop()
  injury: string;

  @ApiProperty({ default: 0 })
  @Prop()
  pointsScored: number;

  @ApiProperty({ default: 0 })
  @Prop()
  granica: number;
}

export const ProjectionSchema = SchemaFactory.createForClass(Projection);
