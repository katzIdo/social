import { makeStyles } from "@material-ui/core/styles";

export const appStyle = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
}));
