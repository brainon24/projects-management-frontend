import React from "react";
// import Chip from "@material-ui/core/Chip";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Input, Chip, Autocomplete } from "@mui/material";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: 500,
//       "& > * + *": {
//         marginTop: theme.spacing(3),
//       },
//     },
//   })
// );

interface User {
  id: number;
  name: string;
}

const userList: User[] = [
  { id: 1, name: "name 1" },
  { id: 2, name: "name 2" },
  { id: 3, name: "name 3" },
  { id: 4, name: "name 4" },
  { id: 5, name: "name 5" },
];


export default function TagsInputAutoCompleteMUI() {
    //   const classes = useStyles();

  const [value, setValue] = React.useState<any>([userList[0].name]);

  console.log("value: ", value);

  return (
    // <div className={classes.root}>
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: any) => {
            console.log('newValue: ', newValue)
          setValue(newValue);
        }}
        multiple
        id="tags-filled"
        options={userList.map((option: any) => option.name)}
        freeSolo
        renderTags={(value: string[], getTagProps: any) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params: any) => (
        <Input
            {...params}
            variant="filled"
            label="Users"
            placeholder="Search"
          />
        )}
      />
    </div>
  );
}