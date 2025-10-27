import { z } from "zod";

import {
  BaseZodDictionary,
  BlockConfiguration,
  SchemaDictionary,
} from "./utils";

/**
 *
 * @param blocks Schema dictionary or DocumentBlocksDictionary
 * @returns zod schema that can parse arbitary objects into a single BlockConfiguration
 */
export default function buildBlockConfigurationSchema<
  T extends BaseZodDictionary,
>(blocks: SchemaDictionary<T>) {
  const blockObjects = Object.keys(blocks).map((type) =>
    z.object({
      type: z.literal(type as string),
      data: blocks[type as keyof T].schema,
    })
  );

  return z
    .discriminatedUnion(
      "type",
      blockObjects as unknown as [
        z.ZodObject<{
          type: z.ZodLiteral<string>;
          data: z.ZodObject<z.ZodRawShape>;
        }>,
        ...z.ZodObject<{
          type: z.ZodLiteral<string>;
          data: z.ZodObject<z.ZodRawShape>;
        }>[],
      ]
    )
    .transform((v) => v as BlockConfiguration<T>);
}
