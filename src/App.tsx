import "./App.css";
import AccountMenu from "./components/Menus/AccountMenu";
import AdminLanding from "./pages/AdminLanding";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <>
      {/* <Grid container justifyContent="flex-end"> */}
      <AccountMenu />
      {/* </Grid> */}
      {/* <div className="App">
        <AdminLanding />
      </div> */}
    </>
  );
}

export default App;
