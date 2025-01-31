

export interface FigureObject {
 
    id: number;
    coordX: number,
    coordY: number,
    type: string,
    width: number,
    height: number
  }
  
  interface Point {
    x: number;
    y: number;
  }
  
  export interface LineObject {
   
    
  id: number,
    coordX: number,
    coordY: number,
    type: string,
    width:  number,
    height: number,
   
    path: Point[],
    strokeWidth: number,
    color: string,
  }
  
  
  export interface FrameObject {
   
    id: number;
    coordX: number,
    coordY: number,
    type: string,
    width: number,
    height: number,
    background: string
  }
  
  