"use client";
import Title from "../../../../(main)/_components/Title";
import Delete from "../../../../(main)/_components/IsDelete";
import Toolbar from "../../../../(main)/_components/Toolbar";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Banner from "../../../../(main)/_components/Banner";
import MenuBar from "../../../../(main)/_components/menu";
import ErrorPublic from "../../../errorPublic";
import { Spinner } from "../../../../../components/spinner";
const DocumentIdPage = () => {
  const params = useParams();

  const Editor = useMemo(
    () =>
      dynamic(() => import("../../../../../components/Editor"), { ssr: false }),
    [params.documentId]
  );

  const theDocument = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  document.title = theDocument?.title;

  if (theDocument == undefined) {
    return (
      <div className="h-screen relative flex items-center justify-center  bg-white  dark:bg-[#1f1f1f]">
        <Spinner size="xxlg" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      {theDocument?.isPublished ? (
        <>
          <div className="flex items-start justify-between border-b-secondary border-b-2 px-12">
            <Title
              theTitle={theDocument?.title}
              Icon={theDocument?.icon}
              preview={true}
            />
            <MenuBar preview={true} />
          </div>

          <Banner imageURL={theDocument?.coverImage} />

          {theDocument?.isArchived && <Delete />}

          <Toolbar
            theTitle={theDocument?.title}
            icon={theDocument?.icon}
            preview={true}
          />
          <div className="md:max-w-3xl lg:max-w-4xl">
            <Editor editable={false} initialContent={theDocument?.content} />
          </div>
        </>
      ) : (
        <ErrorPublic />
      )}
    </div>
  );
};

export default DocumentIdPage;
