import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <div className="flex items-center justify-center ">
            <div className="flex flex-col border rounded-md px-5 py-5 gap-5 border-gray-400">
                <h1 className="text-center text-xl font-bold">Sign Up</h1>
                <input className="border rounded-md border-gray-400 px-5 py-5" type="text" placeholder="Full Name" />
                <input className="border rounded-md border-gray-400 px-5 py-5" type="text" placeholder="Username" />
                <input className="border rounded-md border-gray-400 px-5 py-5" type="password" placeholder="Password" />
                <input className="border rounded-md border-gray-400 px-5 py-5" type="password" placeholder="Confirm Password" />
                {/* <button className="border border-gray-400 px-5 py-5" type="submit">Login</button> */}
                <Button variant="default" >Sign Up</Button>
                <div className="flex items-center justify-center gap-5">
                    <p>Already have an account?</p> 
                    <Button variant="link">
                        <Link to="/login">Login</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;