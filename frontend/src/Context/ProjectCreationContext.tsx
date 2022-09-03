// import React, { createContext, useContext, useEffect, useState } from "react";

// // interface projectInterface{
// //     project: {taskId:number, name:string, prerequisites:[{id:number, name:string, details:string}]},

// // }
// // interface ProjectContextInterface {
// //     prerequisite: {id:number, name:string, details:string}
// //     project: {taskId:number, name:string, prerequisites:[{id:number, name:string, details:string}]},
// //     updatePrerequisite: (id:number, name:string, details:string) => void,
// // }


// // const ProjectContext = createContext<ProjectContextInterface | null>(null);

// interface Props {
//     children: JSX.Element[] | JSX.Element
// }

// const ProjectContextProvider = (props: Props) => {
//     useEffect(() => {
//         console.log("use effect from project context");
//     }, []);

//     const [project, setProject] = useState([{ taskId: 0 }]);

//     // useEffect(() => {
//     //     if (project?.length !== 0) {
//     //         window.localStorage.setItem("project", JSON.stringify(project));
//     //         console.log("local storage updated");
//     //     } else {
//     //         window.localStorage.removeItem("project");
//     //         console.log("user not logged in");
//     //     }
//     // }, [project]);

//     const updateTask = (id: number, taskName: string){
//         setProject(v => v[id] ? [{ ...v[id], name: taskName }, ...v.filter(e => e.taskId != id)] : v)
//     }


//     const myProjectContext: ProjectContextInterface = {
//     }

//     return (
//         <ProjectContext.Provider
//             value={
//                 myProjectContext
//             }
//         >
//             {props.children}
//         </ProjectContext.Provider>
//     );
// }

// export function useProjectContext() {
//     return useContext(ProjectContext);
// }

// export default ProjectContextProvider;

