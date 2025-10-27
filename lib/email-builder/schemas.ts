import { z } from "zod";

import {
  AvatarPropsSchema,
  ButtonPropsSchema,
  DividerPropsSchema,
  HeadingPropsSchema,
  HtmlPropsSchema,
  ImagePropsSchema,
  SpacerPropsSchema,
  TextPropsSchema,
} from "@/lib/blocks";

import ColumnsContainerPropsSchema from "@/lib/editor/columns-container-schema";
import ContainerPropsSchema from "@/lib/editor/container-schema";
import EmailLayoutPropsSchema from "@/lib/editor/email-layout-schema";

import { buildBlockConfigurationSchema } from "@/lib/document-core";

export const readerSchemaDict = {
  Avatar: { schema: AvatarPropsSchema },
  Button: { schema: ButtonPropsSchema },
  Divider: { schema: DividerPropsSchema },
  Heading: { schema: HeadingPropsSchema },
  Html: { schema: HtmlPropsSchema },
  Image: { schema: ImagePropsSchema },
  Spacer: { schema: SpacerPropsSchema },
  Text: { schema: TextPropsSchema },
  Container: { schema: ContainerPropsSchema },
  ColumnsContainer: { schema: ColumnsContainerPropsSchema },
  EmailLayout: { schema: EmailLayoutPropsSchema },
} as const;

export const ReaderBlockSchema =
  buildBlockConfigurationSchema(readerSchemaDict);
export type TReaderBlock = z.infer<typeof ReaderBlockSchema>;

export const ReaderDocumentSchema = z.record(z.string(), ReaderBlockSchema);
export type TReaderDocument = z.infer<typeof ReaderDocumentSchema>;

export type TReaderBlockProps = { id: string };
export type TReaderProps = {
  document: TReaderDocument;
  rootBlockId: string;
};
