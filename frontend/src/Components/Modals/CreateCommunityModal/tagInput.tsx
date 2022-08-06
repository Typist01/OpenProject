// import * as React from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import { TextField } from '@mui/material';
// import { Chip } from '@mui/material';
// import { Stack } from '@mui/material';

// const getProps = (
//     baseProps: BaseTextFieldProps,
//     variant: TextFieldProps["variant"]
//   ): TextFieldProps => {
//     switch (variant) {
//       case "filled":
//         return { ...baseProps, variant };
//       case "outlined":
//         return { ...baseProps, variant };
//       default:
//         return { ...baseProps, variant };
//     }
//   };
  
// export default () => (
    
//     <Stack spacing={3} sx={{ width: 500 }}>
//         {/* wait.we do we even have autocomplete? what does it do? */}
//         {/* I think mui uses autocomplete component to suggest stuff in tags. ok we can actually implement that and say that people already used x as tag so that user can reuse it. we need a db for that tho */}
//         <Autocomplete
//             multiple
//             id="tags-filled"
//             // renderInput={params => (
//             //     <TextField {...params} label="readOnly" placeholder="Favorites" variant="filled" />
//             // )}
//             freeSolo
//             renderTags={(value: readonly string[], getTagProps) =>
//                 value.map((option: string, index: number) => (
//                     <Chip
//                         variant="outlined"
//                         label={option}
//                         {...getTagProps({ index })}
//                     />
//                 ))}
//             renderInput={(params) => (
//                 <TextField
//                     // {...params}
//                     {getProps={{value:""}, "filled")} // getProps doesn't even exist on TextField its a function
//                     className="tag-input"
//                     type="text"
//                     // variant="filled"
//                     label="freeSolo"
//                     placeholder="Favorites"
//                 />
//             )}
//         />
//     </Stack>
// ); 

// import { TextFieldProps, BaseTextFieldProps } from "@material-ui/core/TextField";


