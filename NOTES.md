**Next.js 13**

# 1. `pages` directory vs `app` directory

- `pages` -> act as a route in the UI, for example: `pages/home.jsx` would take you to the `/home` route.

<br>

- `app`

  - **Routing with the `app`**

    - just like files inside the `pages` directory, routing with the `app` directory is controlled via the folders inside of it: `app/profile/settings/page.jsx` -> `www.site.com/profile/settings`

  - **`loading.tsx` file**

    - is an optional file that you can create within any directory inside of the `app` folder. \*\*It automatically wraps the page inside a React suspense boundary. The component will be shown immediately on the first load as well as when you're navigating between the sibling routes

  - **`error.tsx` file**

    - is an optional file that isolates the error to the smallest possible subsection of the app. Creating the `error.tsx` file automatically wraps the page inside of a React error boundary.

  - **`layout.tsx` file**

    - is used to define a UI that is shared across multiple places. A layout can render another layout or a page inside of it. Whenever a route changes to any component that is within the layout, its state is preserved because the layout component is not unmounted.

  - **`template.tsx` file**
    - is similar to the `layout.tsx` file, but upon navigation, an new instance of the component is mounted and the state is not preserved.
    - **using layouts and templates allows us to take advantage of a concept known as partial rendering**. While moving between routes inside of the same folder, only the layouts and pages inside of that folder are fetched and rendered.

```jsx
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <Page />
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

- inside `app`: `layout.tsx`, `template.tsx`, `error.tsx`, `lading.tsx`, `page.tsx`

# 2. Caveats of using the `app` directory

- **Mandatory root layout**
  - There MUST be a file that defines the root layout at the top level of the `app` directory.
  - This layout is applicable to **ALL** the routes in the app
  - The root layout **MUST** define `<html>` and the `<body>` tags because Next.js doesn't automatically add them.

<br>

- **Head tag**
  - Inside any folder in the `app` directory, we'll create a `head.tsx` file that will define the contents of the `<head>` tag for that folder.
  - The component returned from this `head.tsx` file can only return certain limited tags like `<title>`, `<meta>`, `<link>`, `<script>`

<br>

- **Route groups**
  - Every folder inside the `app` directory contributes to the URL path. But, it's possible to opt-out of it by wrapping the folder name inside of parentheses. All of the files and folders inside of this special folder are said to be a part of that route group:
    - `app/(group)/cart/page.tsx` -> `www.site.com/cart`
    - `app/(group)/profile/page.tsx` -> `www.site.com/profile`

<br>

- **Server components**
  - By default, all of the components created inside of the `app` directory are React **server** components, leading to better performance due to a smaller size.
  - It we want to switch to the client component, we need to specify that with `'use client'` directive at the top of the file.

# 3. Misc

## 3.1 Tailwind

- `pnpm i -D tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p`

# 4. Layout

- The top-most layout is called the **Root Layout**. This required layout **is shared across all pages in an application**. Root layouts must contain html and body tags.
- Any route segment can optionally define its own Layout. These layouts will be shared across all pages in that segment.
- Layouts in a route are nested by default. Each parent layout wraps child layouts below it using the React children prop.
- You can use Route Groups to opt specific route segments in and out of shared layouts.
- Layouts are Server Components by default but can be set to a Client Component.
- Layouts can fetch data. View the Data Fetching section for more information.
- Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.
- Layouts do not have access to the current route segment(s). To access route segments, you can use useSelectedLayoutSegment or useSelectedLayoutSegments in a Client Component.
- .js, .jsx, or .tsx file extensions can be used for Layouts.
  A layout.js and page.js file can be defined in the same folder. The layout will wrap the page.
