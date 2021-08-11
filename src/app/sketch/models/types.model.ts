export type states = 'eraser' | 'pencil';

export interface sketchConfigurations {
  size: number,
  state: states,
  color: string
}