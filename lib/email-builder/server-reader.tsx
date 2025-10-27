import React from "react";

import {
  Avatar,
  Button,
  Divider,
  Heading,
  Html,
  Image,
  Spacer,
  Text,
  Container as BaseContainer,
} from "@/lib/blocks";

import { ColumnsContainer as BaseColumnsContainer } from "@/lib/blocks/columns-container";

import { readerSchemaDict, type TReaderDocument } from "./schemas";

import type { ContainerProps } from "@/lib/editor/container-schema";

import type { ColumnsContainerProps } from "@/lib/editor/columns-container-schema";

import type { EmailLayoutProps } from "@/lib/editor/email-layout-schema";

function ServerContainerReader({
  document,
  style,
  props,
}: ContainerProps & { document: TReaderDocument }) {
  const childrenIds = props?.childrenIds ?? [];
  return (
    <BaseContainer style={style}>
      {childrenIds.map((childId) => (
        <ServerReaderBlock key={childId} document={document} id={childId} />
      ))}
    </BaseContainer>
  );
}

function ServerColumnsContainerReader({
  document,
  style,
  props,
}: ColumnsContainerProps & { document: TReaderDocument }) {
  const { columns, ...restProps } = props ?? {};
  let cols: (React.ReactElement | React.ReactElement[] | null)[] | undefined =
    undefined;
  if (columns) {
    cols = columns.map((col) =>
      col.childrenIds.map((childId) => (
        <ServerReaderBlock key={childId} document={document} id={childId} />
      ))
    );
  }
  return (
    <BaseColumnsContainer style={style} props={restProps} columns={cols} />
  );
}

function getFontFamily(fontFamily: EmailLayoutProps["fontFamily"]) {
  const f = fontFamily ?? "MODERN_SANS";
  switch (f) {
    case "MODERN_SANS":
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case "BOOK_SANS":
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case "ORGANIC_SANS":
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case "GEOMETRIC_SANS":
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case "HEAVY_SANS":
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case "ROUNDED_SANS":
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case "MODERN_SERIF":
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case "BOOK_SERIF":
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case "MONOSPACE":
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
}

function getBorder(props: Pick<EmailLayoutProps, "borderColor">) {
  if (!props.borderColor) {
    return undefined;
  }
  return `1px solid ${props.borderColor}`;
}

function ServerEmailLayoutReader({
  document,
  ...props
}: EmailLayoutProps & { document: TReaderDocument }) {
  const childrenIds = props.childrenIds ?? [];
  return (
    <div
      style={{
        backgroundColor: props.backdropColor ?? "#F5F5F5",
        color: props.textColor ?? "#262626",
        fontFamily: getFontFamily(props.fontFamily),
        fontSize: "16px",
        fontWeight: "400",
        letterSpacing: "0.15008px",
        lineHeight: "1.5",
        margin: "0",
        padding: "32px 0",
        minHeight: "100%",
        width: "100%",
      }}
    >
      <table
        align="center"
        width="100%"
        style={{
          margin: "0 auto",
          maxWidth: "600px",
          backgroundColor: props.canvasColor ?? "#FFFFFF",
          borderRadius: props.borderRadius ?? undefined,
          border: getBorder({ borderColor: props.borderColor }),
        }}
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
      >
        <tbody>
          <tr style={{ width: "100%" }}>
            <td>
              {childrenIds.map((childId) => (
                <ServerReaderBlock
                  key={childId}
                  document={document}
                  id={childId}
                />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const SERVER_READER_DICTIONARY = {
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
    Component: ServerContainerReader,
  },
  ColumnsContainer: {
    ...readerSchemaDict.ColumnsContainer,
    Component: ServerColumnsContainerReader,
  },
  EmailLayout: {
    ...readerSchemaDict.EmailLayout,
    Component: ServerEmailLayoutReader,
  },
} as const;

const ServerBaseReaderBlock = ({
  type,
  data,
  document,
}: {
  type: string;
  data: Record<string, unknown>;
  document: TReaderDocument;
}) => {
  const config =
    SERVER_READER_DICTIONARY[type as keyof typeof SERVER_READER_DICTIONARY];
  if (!config) {
    return null;
  }
  const Component = config.Component;
  return <Component document={document} {...data} />;
};

export function ServerReaderBlock({
  document,
  id,
}: {
  document: TReaderDocument;
  id: string;
}) {
  const block = document[id];
  if (!block) return null;
  return (
    <ServerBaseReaderBlock
      type={block.type}
      data={block.data}
      document={document}
    />
  );
}
