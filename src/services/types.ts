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