"use client"
import { Spinner } from "../../components/spinner";
import useLoader from '../../hooks/use-loader';
import { useUser } from "@clerk/clerk-react";
import NotLogin from "./_components/NotLogin";
import Navigation from "./_components/navigation";
import { cn } from "../../lib/utils";

const MainLayout = ({ children }) => {
    const user = useUser()
    const loaderHook = useLoader()

    return (
        <>
            {loaderHook &&
                <div className="h-screen relative flex items-center justify-center  bg-white  dark:bg-[#1f1f1f]">
                    <Spinner size='xxlg' />
                </div>
            }
            {!loaderHook && user.isSignedIn &&
                <div className={cn("min-h-screen flex relative overflow-hidden bg-white dark:bg-[#2b2a2a]")} >
                    <Navigation className="absolute" />
                    <main className={cn("flex w-screen relative")}>
                        {children}
                    </main>
                </div>}
            {!loaderHook && !user.isSignedIn && <NotLogin />}
        </>);
}

export default MainLayout;