import "./App.css";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import theme from "./Theme";

import RoutesMain from "./Routes";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RoutesMain />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
