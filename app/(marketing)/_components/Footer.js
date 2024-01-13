import { Button } from "../../../components/ui/button"
import Logo from "./Logo"

const Footer = () => {
    return (
        <div className="flex sm:flex-col-reverse md:flex-row items-center w-full p-2 container justify-center md:justify-between">
            <Logo />
            <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="ghost" size="sm" >Privacy Policy</Button>
                <Button variant="ghost" size="sm" >Terms & Conditions</Button>
            </div>
        </div>
    )
}

export default Footer