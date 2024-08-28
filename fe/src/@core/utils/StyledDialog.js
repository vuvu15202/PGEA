import {styled} from "@mui/material/styles";
import {Dialog} from "@mui/material";

export const StyledDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogActions-root': {
    marginTop: theme.spacing(3),
  },
}));