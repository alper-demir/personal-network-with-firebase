import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Login from "./pages/Login";
import Register from './pages/Register';
import HomeLayout from "./layouts/HomeLayout";
import Error from "./pages/Error";
import PostDetail from "./pages/PostDetail";
import Music from "./pages/Music";
import ProfileLayout from "./layouts/ProfileLayout";
import Posts from "./components/profile/Posts";

const router = createBrowserRouter([
    {
        path: "", element: <HomeLayout />,
        children: [
            { path: "", element: <App /> },
            {
                path: "/profile/:username", element: <ProfileLayout />,
                children: [
                    { path: "", element: <Posts /> },
                ]
            },
            { path: "/post/:postId", element: <PostDetail /> },
            { path: "/music", element: <Music /> }
        ]
    },
    {
        path: "login", element: <Login />
    },
    {
        path: "register", element: <Register />
    },
    {
        path: "/error", element: <Error />
    },
    {
        path: "*", element: <Error />
    }
])

export default router