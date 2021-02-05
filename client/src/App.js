import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Search from "./components/search";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1db954",
    },
    secondary: {
      main: "#212121",
    },
  },

  MuiTypography: {
    variantMapping: {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h5",
      h5: "h2",
      h6: "h2",
      subtitle1: "h2",
      subtitle2: "h2",
      body1: "span",
      body2: "span",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Search />
      </div>
    </ThemeProvider>
  );
}

export default App;
