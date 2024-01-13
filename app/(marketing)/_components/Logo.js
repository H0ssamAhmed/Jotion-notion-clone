import { cn } from "../../../lib/utils";
import Image from 'next/image'

const Logo = () => {
    return (
        <div className='hidden sm:flex items-center gap-x-2 select-none'>
            <Image src='/logo.svg' alt="logo" className='object-contain dark:hidden' width='40' height='40' />
            <Image src='/logo-dark.svg' alt="logo" className='object-contain hidden dark:block ' width='40' height='40' />

            <p className={cn("font-semibold")}>Jotion</p>
        </div>
    )
}

export default Logo