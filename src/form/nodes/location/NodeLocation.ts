export default interface NodeLocation {
  start: {
    offset: number;
    line: number;
    column: number;
  };
  end: {
    offset: number;
    line: number;
    column: number
  };
}