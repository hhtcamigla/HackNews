export type StoryInfo = {
    id : number
    by: string
    descendants : number
    kids : number[]
    score : number
    time: number
    title : string
    type: string
    url: string 
}

export type UserInfo = {
    id : string
    created: number
    about: string
    delay: number
    karma: number
    submitted: number[] 
}
