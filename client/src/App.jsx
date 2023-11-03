import React from "react";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";

import UserRoute from "./Routes/userRoute";
import AdminRoute from "./Routes/adminRoute";

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
