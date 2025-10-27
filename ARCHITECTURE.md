# EmailBuilder.js Next.js Architecture Guide

## 🏗️ System Architecture

### Data Flow Diagram

```
User Action
    ↓
UI Component (e.g., TextInput in sidebar)
    ↓
onChange callback
    ↓
Zod Schema Validation (e.g., TextPropsSchema)
    ↓
setDocument() → Zustand Store
    ↓
Document Updated (flat dictionary with IDs)
    ↓
useDocument() hook triggers re-render
    ↓
EditorBlock / Reader components re-render
    ↓
Screen updates
```

---

## 📊 Document Structure

### The Email Document (JSON)
```typescript
{
  "root": {
    type: "EmailLayout",
    data: {
      backdropColor: "#F5F5F5",
      canvasColor: "#FFFFFF",
      textColor: "#262626",
      fontFamily: "MODERN_SANS",
      childrenIds: ["block-123", "block-456"]  // References to children
    }
  },
  "block-123": {
    type: "Text",
    data: {
      props: { text: "Hello world" },
      style: {
        color: "#000000",
        fontSize: 16,
        padding: { top: 16, bottom: 16, left: 24, right: 24 }
      }
    }
  },
  "block-456": {
    type: "Button",
    data: {
      props: {
        text: "Click me",
        url: "https://example.com"
      },
      style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } }
    }
  }
}
```

**Why Flat Structure?**
- ✅ Easy to serialize/deserialize
- ✅ Simple to manipulate (add/remove/update blocks)
- ✅ Database-friendly (JSON column in Postgres)
- ✅ No circular references
- ✅ Efficient lookups by ID

---

## 🔄 State Management (Zustand)

### Store Structure
```typescript
{
  // The actual email data
  document: TEditorConfiguration,
  
  // UI state
  selectedBlockId: string | null,           // Which block is selected
  selectedSidebarTab: 'block-configuration' | 'styles',
  selectedMainTab: 'editor' | 'preview' | 'json' | 'html',
  selectedScreenSize: 'desktop' | 'mobile',
  inspectorDrawerOpen: boolean,
  samplesDrawerOpen: boolean
}
```

### Key Functions
```typescript
// Selection
setSelectedBlockId(id)      // Select a block (opens Inspector tab)
setDocument(partialDoc)      // Merge updates into document
resetDocument(doc)           // Replace entire document

// UI state
setSelectedMainTab(tab)      // Switch between Edit/Preview/HTML/JSON
toggleInspectorDrawerOpen()  // Show/hide right sidebar
toggleSamplesDrawerOpen()    // Show/hide left sidebar
```

---

## 🎨 Component Hierarchy

### Editor Mode (with interactivity)
```
EditorPage
├── TemplatesPanel (left sidebar)
├── EditorCanvas (center)
│   ├── Toolbar (tabs + controls)
│   └── MainPanel
│       ├── EditorBlock id="root"
│       │   └── EmailLayoutEditor
│       │       └── EditorChildrenIds
│       │           ├── AddBlockMenu (insert position 0)
│       │           ├── EditorBlock id="block-123"
│       │           │   └── EditorBlockWrapper
│       │           │       ├── TuneMenu (delete button)
│       │           │       └── Text component
│       │           ├── AddBlockMenu (insert position 1)
│       │           ├── EditorBlock id="block-456"
│       │           └── AddBlockMenu (append)
│       │
│       ├── OR Preview: Reader component
│       ├── OR HtmlPanel: Code viewer
│       └── OR JsonPanel: Code viewer
│
└── InspectorPanel (right sidebar)
    ├── Styles tab → StylesPanel (EmailLayoutSidebarPanel)
    └── Inspect tab → ConfigurationPanel
        └── TextSidebarPanel (or any block-specific panel)
```

### Preview/Export Mode (clean rendering)
```
Reader
└── ReaderBlock id="root"
    └── EmailLayoutReader
        └── ReaderBlock id="block-123"
            └── Text component (no wrapper!)
```

---

## 🔧 How Each Feature Works

### 1. Adding a Block
```typescript
// User clicks "+" button → selects "Text"
AddBlockMenu.onSelect(block) →
  EditorChildrenIds.insertBlock(block, index) →
    generateId() → "block-1698765432"
    onChange({ blockId, block, childrenIds: [...old, newId] }) →
      setDocument({
        [newId]: { type: 'Text', data: {...} },
        [parentId]: { ...parent, childrenIds: [...updated] }
      })
```

### 2. Editing a Block
```typescript
// User types in TextInput → "Hello"
TextInput.onChange("Hello") →
  TextSidebarPanel.updateData({ ...data, props: { text: "Hello" } }) →
    TextPropsSchema.safeParse(updated) →
      setData(validated) →
        ConfigurationPanel.setBlock({ type: 'Text', data: validated }) →
          setDocument({ [selectedBlockId]: updatedBlock })
```

### 3. Selecting a Block
```typescript
// User clicks on a block
EditorBlockWrapper.onClick() →
  setSelectedBlockId(blockId) →
    Zustand: {
      selectedBlockId: blockId,
      selectedSidebarTab: 'block-configuration',  // Auto-switch to Inspect
      inspectorDrawerOpen: true                   // Auto-open inspector
    } →
      InspectorPanel re-renders →
        ConfigurationPanel renders TextSidebarPanel
```

### 4. Exporting to HTML
```typescript
// User clicks "HTML" tab
EditorCanvas switches to HtmlPanel →
  renderToStaticMarkup(document, { rootBlockId: 'root' }) →
    React.renderToStaticMarkup(
      <html><body><Reader document={doc} /></body></html>
    ) →
      Returns: "<!DOCTYPE html><html>...</html>"
```

---

## 🧩 Block System Explained

### How Blocks Are Registered
```typescript
// In lib/editor/core.tsx
const EDITOR_DICTIONARY = buildBlockConfigurationDictionary({
  Text: {
    schema: TextPropsSchema,           // Zod schema for validation
    Component: (props) => (             // React component
      <EditorBlockWrapper>
        <Text {...props} />
      </EditorBlockWrapper>
    )
  },
  // ... more blocks
});

// This creates:
EditorBlock = buildBlockComponent(EDITOR_DICTIONARY)
EditorBlockSchema = buildBlockConfigurationSchema(EDITOR_DICTIONARY)
```

### Adding a New Block Type
To add a custom block (e.g., "VideoEmbed"):

1. **Create the rendering component:**
```typescript
// lib/blocks/video-embed.tsx
export const VideoEmbedPropsSchema = z.object({
  props: z.object({
    videoUrl: z.string(),
    thumbnail: z.string().optional(),
  }).optional().nullable()
});

export function VideoEmbed({ props }: VideoEmbedProps) {
  return (
    <div>
      <iframe src={props?.videoUrl} />
    </div>
  );
}
```

2. **Register in editor dictionary:**
```typescript
// lib/editor/core.tsx
import { VideoEmbed, VideoEmbedPropsSchema } from '@/lib/blocks/video-embed';

const EDITOR_DICTIONARY = {
  // ... existing blocks
  VideoEmbed: {
    schema: VideoEmbedPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <VideoEmbed {...props} />
      </EditorBlockWrapper>
    )
  }
};
```

3. **Create sidebar panel:**
```typescript
// components/inspector-inputs/panels/video-embed-sidebar-panel.tsx
export default function VideoEmbedSidebarPanel({ data, setData }) {
  return (
    <BaseSidebarPanel title="Video block">
      <TextInput
        label="Video URL"
        defaultValue={data.props?.videoUrl ?? ''}
        onChange={(videoUrl) => 
          updateData({ ...data, props: { ...data.props, videoUrl } })
        }
      />
    </BaseSidebarPanel>
  );
}
```

4. **Add to ConfigurationPanel switch statement**

5. **Add to AddBlockMenu options**

That's it! The block is now fully integrated.

---

## 🎯 Key Design Patterns

### 1. Schema-First Design
Every block has a Zod schema that:
- Validates data at runtime
- Generates TypeScript types automatically
- Provides defaults
- Enables safe parsing

### 2. Separation of Concerns
- **Blocks** (`lib/blocks/`) - Pure rendering, no state
- **Editor Components** (`components/email-editor/`) - Handles interactivity
- **Reader Components** (`lib/email-builder/`) - Clean output rendering
- **Input Components** (`components/inspector-inputs/`) - Reusable form inputs

### 3. Context + Zustand Hybrid
- **Zustand** for global editor state
- **React Context** for passing IDs down tree (`EditorBlockContext`)
- Avoids prop drilling while keeping state centralized

### 4. Builder Pattern
```typescript
buildBlockConfigurationDictionary(blocks) → Typed registry
buildBlockComponent(dictionary) → React component factory
buildBlockConfigurationSchema(dictionary) → Zod validation schema
```

This pattern makes the system extensible - add blocks by extending the dictionary.

---

## 🚦 Common Debugging Flows

### "Block not rendering"
1. Check console for Zod validation errors
2. Verify block type is in EDITOR_DICTIONARY
3. Check document structure (is childrenIds populated?)
4. Verify imports are correct

### "Changes not updating"
1. Check if setDocument() is being called
2. Verify Zod schema is passing (check safeParse result)
3. Ensure component is using useDocument() hook
4. Check for stale closures in callbacks

### "Inspector panel empty"
1. Verify block is selected (useSelectedBlockId())
2. Check selectedBlockId exists in document
3. Ensure panel is imported in ConfigurationPanel switch
4. Verify data structure matches schema

---

## 📚 Code Reference Guide

### Most Important Files:
1. **`lib/editor/core.tsx`** - Block registry (add blocks here)
2. **`lib/editor/editor-store.ts`** - State management (extend state here)
3. **`components/email-editor/configuration-panel.tsx`** - Panel routing (add panels here)
4. **`lib/blocks/index.ts`** - Block exports (import from here)

### When You Need To:
- **Add a block type** → `lib/editor/core.tsx` + new sidebar panel
- **Add an input type** → `components/inspector-inputs/`
- **Change global state** → `lib/editor/editor-store.ts`
- **Modify rendering** → `lib/blocks/`
- **Add a template** → `lib/email-templates/`

---

## 🎓 Learning the Codebase

### Start Here:
1. Read `lib/blocks/text.tsx` - Simplest block
2. Read `lib/editor/core.tsx` - How blocks are registered
3. Read `components/email-editor/block-wrapper.tsx` - How selection works
4. Read `components/inspector-inputs/panels/text-sidebar-panel.tsx` - How editing works

### Then Explore:
5. Container blocks (how nesting works)
6. Reader vs Editor (two rendering modes)
7. EditorChildrenIds (how adding works)
8. State management flows

---

**You've just migrated a complex email builder to Next.js with ZERO compromises on functionality!** 🎉

