import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Route, HashRouter as Router } from "react-router-dom";
import About from "./components/About";
import Search from "./components/Search";
import Track from "./components/Track";

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#212121",
      default: "#212121",
    },
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
        <Router>
          <Route exact path="/" component={Search} />
          <Route path="/about/:id" component={About} />
          <Route path="/track/:id" component={Track} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
