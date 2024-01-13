"use client";
import Title from "../../../_components/Title";
import Delete from "../../../_components/IsDelete";
import Toolbar from "../../../_components/Toolbar";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Image from "next/image";
import Banner from "../../../_components/Banner";
import MenuBar from "../../../_components/menu";
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

  const UpdateContent = useMutation(api.documents.update);
  const onContentChange = (content) => {
    UpdateContent({
      id: params.documentId,
      content: content,
    });
  };

  document.title = theDocument?.title;
  if (theDocument === undefined) {
    return (
      <div className="h-screen w-screen relative flex items-center justify-center  bg-white  dark:bg-[#1f1f1f]">
        <Spinner size="xxlg" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-start justify-between border-b-secondary border-b-2 px-12">
        <Title
          theTitle={theDocument?.title}
          Icon={theDocument?.icon}
          preview={false}
        />
        <MenuBar preview={false} />
      </div>

      {theDocument?.isArchived && <Delete />}
      <Banner imageURL={theDocument?.coverImage} />

      <Toolbar
        theTitle={theDocument?.title}
        icon={theDocument?.icon}
        preview={false}
      />
      {/* <div className="max-w-[40rem] lg:max-w-[70rem]"> */}
      <Editor
        onChange={onContentChange}
        initialContent={theDocument?.content}
      />
      {/* </div> */}
    </div>
  );
};

export default DocumentIdPage;
