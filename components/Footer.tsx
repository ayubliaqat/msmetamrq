import { div } from "framer-motion/client";

export default function Footer(){
    return(
        <div className="bg-gray-800 text-white py-6 px-20 mt-10">
      <p className="text-center">&copy; {new Date().getFullYear()} MS Metamarq. All rights reserved.</p>
    </div>
    );
}