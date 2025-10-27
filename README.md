# EmailBuilder.js - Next.js Edition

A production-ready, fully-featured email template builder rebuilt from scratch in Next.js with Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open the editor
# Navigate to: http://localhost:3000/editor
```

## ✨ Features

### ✅ Complete Email Editor
- **10 Block Types**: Text, Button, Image, Heading, Avatar, Divider, Spacer, Html, Container, Columns
- **Drag & Drop Interface**: Add blocks anywhere with "+" buttons
- **Real-time Editing**: Changes update instantly
- **Mobile Preview**: Toggle between desktop and mobile views
- **9 Sample Templates**: Pre-built professional email templates

### ✅ Advanced Editing
- **Block-Specific Inspectors**: Custom property editors for each block type
- **Global Styles**: Backdrop color, canvas color, font family, text color
- **Style Controls**: Color picker, padding editor, font controls, alignment
- **Container Blocks**: Nest blocks infinitely
- **Multi-Column Layouts**: 2 or 3 column layouts with customizable widths

### ✅ Export & Share
- **JSON Export/Import**: Download and restore templates
- **HTML Generation**: Export production-ready HTML
- **URL Sharing**: Share templates via encoded URL hash
- **API Endpoint**: Server-side HTML rendering at `/api/render`

## 📁 Project Structure

```
├── app/
│   ├── editor/page.tsx           # Main editor UI
│   └── api/render/route.ts       # HTML rendering API
│
├── components/
│   ├── email-editor/             # Editor UI components (15 files)
│   └── inspector-inputs/         # Form inputs + panels (27 files)
│
├── lib/
│   ├── blocks/                   # Block rendering components (11 blocks)
│   ├── document-core/            # Type-safe block system
│   ├── email-builder/            # Reader + HTML export
│   ├── editor/                   # Editor configuration
│   ├── email-templates/          # 9 sample templates
│   └── utils/                    # Helpers
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5
- **Validation**: Zod 4
- **Color Picker**: react-colorful
- **Syntax Highlighting**: highlight.js
- **Code Formatting**: Prettier

## 📖 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Deep dive into system architecture
- **[BUILD-COMPLETE.md](./BUILD-COMPLETE.md)** - What was built and testing guide
- **[MIGRATION-PLAN.md](./MIGRATION-PLAN.md)** - Original migration strategy
- **[PROGRESS.md](./PROGRESS.md)** - Development progress

## 🎯 Key Differences from Original

### ✅ What's Better
- **No Build Step**: Next.js handles all bundling (no separate package builds)
- **Simpler Structure**: Flat `lib/` instead of workspace monorepo
- **Modern Stack**: Tailwind CSS, Next.js 16, React 19
- **Type Safety**: Full TypeScript throughout
- **Server-Side Rendering**: Can render emails on server

### 🔄 What Changed
- **Material-UI → Tailwind CSS**: Cleaner, more maintainable styles
- **Vite → Next.js**: Better dev experience, more features
- **Workspace packages → Lib folder**: Simpler imports

### ✨ What's the Same
- **All block rendering logic**: Identical HTML output
- **Document structure**: Same flat dictionary with IDs
- **Zod schemas**: Same validation rules
- **State management**: Zustand (same patterns)

## 🧪 Testing the Editor

### 1. Load Templates
- Click templates in left sidebar
- All 9 samples should load perfectly

### 2. Add Blocks
- Click any "+" button
- Select a block type
- Block appears immediately

### 3. Edit Blocks
- Click a block to select it
- Right sidebar shows "Inspect" tab
- Edit properties → changes update live

### 4. Delete Blocks
- Select a block
- Click trash icon
- Block removes from document

### 5. Export
- **JSON**: Click download → save template
- **HTML**: Switch to HTML tab → see production code
- **Share**: Click share → URL updates with encoded template

### 6. Multi-Column
- Add a "Columns" block
- Nested "+" buttons appear in each column
- Add blocks to columns independently

## 🏗️ Architecture Highlights

### Block System
```typescript
// Blocks are type-safe via Zod schemas
const block = {
  type: 'Text',
  data: {
    props: { text: 'Hello' },
    style: { color: '#000', padding: {...} }
  }
}

// Validated and rendered via:
<EditorBlock {...block} /> // In editor mode
<ReaderBlock {...block} /> // In preview mode
```

### State Management
```typescript
// Centralized Zustand store
const document = useDocument()           // Get full document
const selectedId = useSelectedBlockId() // Get selected block
setDocument({ [id]: updatedBlock })     // Update block
```

### Rendering Pipeline
```
Editor Mode: Block → EditorBlockWrapper → Interactivity
Preview Mode: Block → Clean HTML (no wrappers)
Export Mode: Block → Static HTML string
```

## 📦 Adding Custom Blocks

1. Create component in `lib/blocks/my-block.tsx`
2. Register in `lib/editor/core.tsx`
3. Create sidebar panel in `components/inspector-inputs/panels/`
4. Add to `ConfigurationPanel` switch statement
5. Add to `AddBlockMenu` options

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed example.

## 🌐 API Routes

### POST /api/render
Converts email document to HTML string (server-side).

```typescript
// Request
POST /api/render
{
  "document": { /* email document JSON */ }
}

// Response
{
  "html": "<!DOCTYPE html><html>...</html>"
}
```

Use this to:
- Generate HTML for email clients
- Send emails via SendGrid/Resend
- Store HTML snapshots in database

## 🔮 Future Enhancements

### Recommended Additions:
- [ ] Database integration (save/load templates)
- [ ] Authentication (NextAuth.js)
- [ ] Real-time collaboration (Liveblocks)
- [ ] Undo/Redo (zustand middleware)
- [ ] Drag & drop reordering (dnd-kit)
- [ ] Custom block creation UI
- [ ] Email sending integration (Resend/SendGrid)
- [ ] Template marketplace
- [ ] AI-powered content generation
- [ ] A/B testing variations

## 📄 License

MIT - Same as original EmailBuilder.js

## 🙏 Credits

Built by migrating and enhancing [usewaypoint/email-builder-js](https://github.com/usewaypoint/email-builder-js)

---

**Ready to build amazing emails!** 📧✨
