import React from 'react'
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { ModeToggleSimple } from "../../../components/mode-toggle";
import { MoreHorizontal, Star, StarOff, Trash, Undo } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "../../../components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { api } from '../../../convex/_generated/api';
import Publish from './Publish';
const MenuBar = ({ preview }) => {
    const { user } = useUser();
    const router = useRouter();

    const params = useParams();

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId,
    });

    const archived = useMutation(api.documents.archived);

    const handelDeltet = (event) => {
        event.stopPropagation();
        const promise = archived({ id: params.documentId }).then(
            router.push("/documents")
        );

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note.",
        });
    };

    const makeItFavorite = useMutation(api.documents.favorite);

    const addToFavorite = (id) => {
        const promise = makeItFavorite({ id });
        toast.promise(promise, {
            loading: "Adding to favorite...",
            success: "Note Wase added to favorite!",
            error: "Failed to add note to favorite.",
        });
    };

    const makeItUnFavorite = useMutation(api.documents.unfavorite);

    const removeToFavorite = (id) => {
        const promise = makeItUnFavorite({ id });
        toast.promise(promise, {
            loading: "Adding to favorite...",
            success: "Note Wase added to favorite!",
            error: "Failed to add note to favorite.",
        });
    };
    const Unarchived = useMutation(api.documents.Unarchived);
    const restoeFormTrash = (id) => {
        const promise = Unarchived({ id });

        toast.promise(promise, {
            loading: "Restoring from trash...",
            success: "Note Restored!",
            error: "Failed to restore note.",
        });
    };

    return (
        <div className="flex items-center justify-center gap-x-4">
            {!preview ?
                <>
                    <Publish Data={document} />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className=" w-60 right-0 bg-gray-200 dark:bg-[#191919] drop-shadow-lg dark:border-gray-700 border-gray-300 border-2 rounded-sm my-2 mx-4 z-[9999] transition-all"
                            align="start"
                        >
                            <div className="flex items-start p-2 justify-start flex-col transition-all select-none text-start text-sm">
                                {!document?.isArchived ? (
                                    document?.IsFavourite ? (
                                        <DropdownMenuItem
                                            className="w-full"
                                            onClick={() => removeToFavorite(document._id)}
                                        >
                                            <div
                                                role="button"
                                                className="opacity-50 w-full h-full transition-all hover:opacity-100 flex items-center gap-2 justify-start m-2 hover:text-orange-500"
                                            >
                                                <StarOff className="w-4 h-4" />
                                                remove to favorite
                                            </div>
                                        </DropdownMenuItem>
                                    ) : (
                                        <DropdownMenuItem
                                            className="w-full"
                                            onClick={() => addToFavorite(document._id)}
                                        >
                                            <div
                                                role="button"
                                                className="opacity-50  transition-all w-full h-full hover:opacity-100 flex items-center gap-2 justify-start m-2 hover:text-orange-500"
                                            >
                                                <Star className="w-4 h-4" />
                                                add to favorite
                                            </div>
                                        </DropdownMenuItem>
                                    )
                                ) : null}
                                {document?.isArchived ? (
                                    <DropdownMenuItem
                                        className="w-full"
                                        onClick={() => restoeFormTrash(document._id)}
                                    >
                                        <div
                                            role="button"
                                            className="opacity-50 transition-all w-full h-full hover:opacity-100 flex items-center gap-2 justify-start m-2  hover:text-orange-500"
                                        >
                                            <Undo className="w-4 h-4" />
                                            Restore
                                        </div>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem className="w-full" onClick={handelDeltet}>
                                        <div
                                            role="button"
                                            className="opacity-50 transition-all w-full h-full hover:opacity-100 flex items-center gap-2 justify-start m-2 hover:text-red-700"
                                        >
                                            <Trash className="w-4 h-4" />
                                            Delete
                                        </div>
                                    </DropdownMenuItem>
                                )}
                                <h1 className="m-2">
                                    Last Edit By:<b> {user?.fullName}</b>
                                </h1>
                                <DropdownMenuSeparator />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
                : ''
            }
            <ModeToggleSimple />
        </div>
    )
}

export default MenuBar