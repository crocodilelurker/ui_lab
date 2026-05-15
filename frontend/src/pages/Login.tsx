import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="flex items-center justify-center ">
            <div className="flex flex-col border rounded-md px-5 py-5 gap-5 border-gray-400">
                <h1 className="text-center text-xl font-bold">Login</h1>
                <input className="border rounded-md border-gray-400 px-5 py-5" type="text" placeholder="Username" />
                <input className="border rounded-md border-gray-400 px-5 py-5" type="password" placeholder="Password" />
                {/* <button className="border border-gray-400 px-5 py-5" type="submit">Login</button> */}
                <Button variant="default" >Login</Button>
                <div className="flex items-center justify-center gap-5">
                    <p>Don't have an account?</p> 
                    <Button variant="link">
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login;