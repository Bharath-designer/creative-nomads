import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Calendar from "../pages/Calendar";
import Tasks from "../pages/Tasks";
import Notes from "../pages/Notes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path:"",
                element:<Home/>
            },
            {
                path:"calendar",
                element:<Calendar/>
            },
            {
                path:"tasks",
                element:<Tasks/>
            },
            {
                path:"notes",
                element:<Notes/>
            },

        ]
    }
])


export default router