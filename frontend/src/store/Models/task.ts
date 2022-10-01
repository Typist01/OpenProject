import prerequisite from "./prerequisite";

type task = {
    id:string;
    name:string;
    prerequisites:prerequisite[]
    files:any[]
}

export default task