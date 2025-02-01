

export interface FigureObject {
 
    id: number;
    coordX: number,
    coordY: number,
    type: string,
    width: number,
    height: number,

    opacity: number,
    border: number,
    background: string, 

    stroke: number, 
    strokeColor: string,
    shadowColor: string, 
    shadowX: number, 
    shadowY: number
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
  
  