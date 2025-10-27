# EmailBuilder.js → Next.js Migration Plan

## Phase 1: Setup & Copy Core Packages (Day 1)

### Step 1.1: Install Dependencies

```bash
cd email-builder-nextjs
npm install zod zustand react-colorful prettier highlight.js
npm install -D @types/react @types/react-dom typescript
```

### Step 1.2: Create Packages Directory

```bash
mkdir -p packages
```

### Step 1.3: Copy Block Packages (AS-IS)

From `email-builder-js` root:

```bash
cp -r packages/block-avatar ../email-builder-nextjs/packages/
cp -r packages/block-button ../email-builder-nextjs/packages/
cp -r packages/block-columns-container ../email-builder-nextjs/packages/
cp -r packages/block-container ../email-builder-nextjs/packages/
cp -r packages/block-divider ../email-builder-nextjs/packages/
cp -r packages/block-heading ../email-builder-nextjs/packages/
cp -r packages/block-html ../email-builder-nextjs/packages/
cp -r packages/block-image ../email-builder-nextjs/packages/
cp -r packages/block-spacer ../email-builder-nextjs/packages/
cp -r packages/block-text ../email-builder-nextjs/packages/
cp -r packages/document-core ../email-builder-nextjs/packages/
cp -r packages/email-builder ../email-builder-nextjs/packages/
```

### Step 1.4: Update package.json with Workspaces

Add to root package.json:

```json
{
  "workspaces": ["packages/*"]
}
```

### Step 1.5: Build Packages

```bash
cd packages/document-core && npm run build
cd ../email-builder && npm run build
# Build each block package if needed
```

---

## Phase 2: Core Editor Logic (Day 1-2)

### Step 2.1: Copy Editor Store (Minimal Changes)

Copy `EditorContext.tsx` → `lib/store/editor-store.ts`

- Remove MUI imports
- Keep Zustand exactly as-is

### Step 2.2: Copy Editor Core Files

```bash
mkdir -p lib/editor
```

Copy these files AS-IS:

- `documents/editor/core.tsx` → `lib/editor/core.tsx`
- `documents/editor/EditorBlock.tsx` → `lib/editor/EditorBlock.tsx`
- `documents/blocks/helpers/EditorChildrenIds/**` → `lib/editor/EditorChildrenIds/`

### Step 2.3: Copy Custom Block Schemas

```bash
mkdir -p lib/blocks
```

Copy:

- `documents/blocks/ColumnsContainer/**` → `lib/blocks/ColumnsContainer/`
- `documents/blocks/Container/**` → `lib/blocks/Container/`
- `documents/blocks/EmailLayout/**` → `lib/blocks/EmailLayout/`

**Modification needed**: Remove `@mui/material` imports, replace with plain divs

### Step 2.4: Copy Sample Templates

```bash
mkdir -p lib/email-templates
cp packages/editor-sample/src/getConfiguration/sample/*.ts lib/email-templates/
cp packages/editor-sample/src/getConfiguration/index.tsx lib/email-templates/getConfiguration.ts
```

---

## Phase 3: Build New UI Components (Day 2-4)

### Step 3.1: Choose UI Library

**Option A**: shadcn/ui (recommended)

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input slider tabs sheet label
```

**Option B**: Headless UI + Tailwind (lighter)

```bash
npm install @headlessui/react
```

### Step 3.2: Build Block Wrapper (Replaces EditorBlockWrapper)

Create: `components/email-editor/block-wrapper.tsx`

- Handles click/hover states
- Shows outline when selected
- Uses Tailwind instead of MUI sx prop

### Step 3.3: Build Inspector Panel (Replaces InspectorDrawer)

Create: `components/email-editor/inspector-panel.tsx`

- Right sidebar with tabs
- Uses shadcn Sheet or custom Tailwind sidebar

### Step 3.4: Build All Input Components

Create in `components/inspector-inputs/`:

- `color-input.tsx` (use react-colorful)
- `padding-input.tsx`
- `font-family-input.tsx`
- `font-size-input.tsx`
- `text-align-input.tsx`
  etc.

### Step 3.5: Build Sidebar Panels (Per Block Type)

Create in `components/inspector-inputs/panels/`:

- `TextSidebarPanel.tsx`
- `ButtonSidebarPanel.tsx`
- `ImageSidebarPanel.tsx`
  etc.

Reference original files but rebuild with new UI components.

### Step 3.6: Build Editor Canvas (Replaces TemplatePanel)

Create: `components/email-editor/editor-canvas.tsx`

- 4 tabs: Editor, Preview, HTML, JSON
- Desktop/Mobile toggle
- Import/Export buttons

### Step 3.7: Build Templates Panel (Replaces SamplesDrawer)

Create: `components/email-editor/templates-panel.tsx`

- Left sidebar with sample templates
- Uses getConfiguration to load templates

### Step 3.8: Build Add Block Menu

Create: `components/email-editor/add-block-menu.tsx`

- The "+" button between blocks
- Popover/dropdown with block options

---

## Phase 4: Next.js App Routes (Day 4-5)

### Step 4.1: Main Editor Page

Create: `app/editor/page.tsx`

```tsx
"use client";
import EditorCanvas from "@/components/email-editor/editor-canvas";
import InspectorPanel from "@/components/email-editor/inspector-panel";
import TemplatesPanel from "@/components/email-editor/templates-panel";

export default function EditorPage() {
  return (
    <div className="flex h-screen">
      <TemplatesPanel />
      <EditorCanvas />
      <InspectorPanel />
    </div>
  );
}
```

### Step 4.2: API Routes (Optional - for persistence)

Create: `app/api/emails/route.ts`

```ts
import { NextResponse } from "next/server";

export async function GET() {
  // Fetch emails from database
}

export async function POST(req: Request) {
  // Save email to database
}
```

### Step 4.3: Render API Route

Create: `app/api/render/route.ts`

```ts
import { renderToStaticMarkup } from "@/packages/email-builder";

export async function POST(req: Request) {
  const { document } = await req.json();
  const html = renderToStaticMarkup(document, { rootBlockId: "root" });
  return NextResponse.json({ html });
}
```

---

## Phase 5: Testing & Polish (Day 5-7)

### Step 5.1: Test Each Block Type

- Verify all blocks render correctly
- Test all inspector inputs
- Test add/remove blocks

### Step 5.2: Test Export

- JSON export/import
- HTML generation
- Share functionality

### Step 5.3: Add Database (Optional)

If you want persistence:

```bash
npm install @vercel/postgres
# or prisma, drizzle, etc.
```

---

## Summary of What Changes

### ✅ COPY AS-IS (No changes)

- All `packages/block-*` folders
- `packages/document-core`
- `packages/email-builder`
- Sample templates (\*.ts in getConfiguration/sample)
- EditorContext.tsx (Zustand store)
- Editor core files (EditorBlock.tsx, core.tsx)
- EditorChildrenIds logic

### 🔄 COPY & MODIFY (Minor changes)

- EmailLayout/Container/ColumnsContainer editors (remove MUI Box)
- EditorBlockWrapper (replace MUI sx with Tailwind)
- getConfiguration (just rename .tsx → .ts)

### 🆕 BUILD FROM SCRATCH (Reference originals)

- All `App/` components → rebuild with Tailwind/shadcn
- InspectorDrawer/\*\* → rebuild as inspector-panel.tsx
- All input-panels/\*\* → rebuild with new UI components
- TemplatePanel → rebuild as editor-canvas.tsx
- SamplesDrawer → rebuild as templates-panel.tsx

---

## Key Differences

### Material-UI → Tailwind/shadcn

```tsx
// OLD (Material-UI)
<Box sx={{ padding: 2, backgroundColor: 'white' }}>
  <Typography variant="h6">Title</Typography>
</Box>

// NEW (Tailwind)
<div className="p-4 bg-white">
  <h3 className="text-lg font-semibold">Title</h3>
</div>
```

### File Structure

```
OLD: packages/editor-sample/src/App/InspectorDrawer/ConfigurationPanel/input-panels/TextSidebarPanel.tsx
NEW: components/inspector-inputs/panels/TextSidebarPanel.tsx
```

### Imports

```tsx
// OLD
import { useDocument } from "../../documents/editor/EditorContext";

// NEW
import { useDocument } from "@/lib/store/editor-store";
```
