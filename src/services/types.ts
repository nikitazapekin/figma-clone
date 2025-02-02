export interface SignInTypes {
    access_token: string
}

export interface SignUpTypes {
    code: number,
    message: string
}
export interface CheckTokenTypes {
    valid: boolean,
    token: string
}

export interface AllDraftsResponse {
    ID: number,
    Name: string,
    Description: string,
    Likes: number,
    CreatedAt: string,
    AuthorID: number
}[]




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
    shadowY: number,
    layout: number
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
    layout: number
  }
  