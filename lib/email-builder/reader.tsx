"use client";
import React, { createContext, useContext } from "react";

import {
  Avatar,
  Button,
  Divider,
  Heading,
  Html,
  Image,
  Spacer,
  Text,
} from "@/lib/blocks";

import {
  buildBlockComponent,
  buildBlockConfigurationDictionary,
} from "@/lib/document-core";

import ColumnsContainerReader from "./columns-container-reader";
import ContainerReader from "./container-reader";
import EmailLayoutReader from "./email-layout-reader";

import {
  readerSchemaDict,
  type TReaderDocument,
  type TReaderBlockProps,
  type TReaderProps,
} from "./schemas";

const ReaderContext = createContext<TReaderDocument>({});

function useReaderDocument() {
  return useContext(ReaderContext);
}

const READER_DICTIONARY = buildBlockConfigurationDictionary({
  Avatar: {
    ...readerSchemaDict.Avatar,
    Component: Avatar,
  },
  Button: {
    ...readerSchemaDict.Button,
    Component: Button,
  },
  Divider: {
    ...readerSchemaDict.Divider,
    Component: Divider,
  },
  Heading: {
    ...readerSchemaDict.Heading,
    Component: Heading,
  },
  Html: {
    ...readerSchemaDict.Html,
    Component: Html,
  },
  Image: {
    ...readerSchemaDict.Image,
    Component: Image,
  },
  Spacer: {
    ...readerSchemaDict.Spacer,
    Component: Spacer,
  },
  Text: {
    ...readerSchemaDict.Text,
    Component: Text,
  },
  Container: {
    ...readerSchemaDict.Container,
    Component: ContainerReader,
  },
  ColumnsContainer: {
    ...readerSchemaDict.ColumnsContainer,
    Component: ColumnsContainerReader,
  },
  EmailLayout: {
    ...readerSchemaDict.EmailLayout,
    Component: EmailLayoutReader,
  },
});

const BaseReaderBlock = buildBlockComponent(READER_DICTIONARY);

export function ReaderBlock({ id }: TReaderBlockProps) {
  const document = useReaderDocument();
  const block = document[id];
  if (!block) return null;
  return <BaseReaderBlock {...block} />;
}

export default function Reader({ document, rootBlockId }: TReaderProps) {
  return (
    <ReaderContext.Provider value={document}>
      <ReaderBlock id={rootBlockId} />
    </ReaderContext.Provider>
  );
}
