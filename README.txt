JOYCE BANDA FOUNDATION SCHOOLS — SHARED NAVIGATION

FILES
- navigation.css: shared navigation styling
- navigation.js: inserts the same responsive navigation panel on every page

INSTALL
1. Copy navigation.css and navigation.js into the same folder as your HTML pages.
2. In EACH page (index.html, about.html, academics.html, admissions.html,
   student-life.html, news.html, gallery.html, calendar.html, contact.html):
   - Add this inside <head>, after any existing stylesheet links:
     <link rel="stylesheet" href="navigation.css">
   - Add this immediately after the opening <body> tag:
     <div id="jbf-site-header"></div>
   - Add this near the end of <body>, before </body>:
     <script src="navigation.js"></script>
3. Remove the old page-specific header/navigation HTML and its duplicate header CSS
   so you do not see two navigation bars. Keep each page's own hero and content.
4. Keep the filenames and relative paths consistent. If your pages are inside
   separate folders, adjust the href/src paths accordingly.

NOTES
- Links assume all nine HTML pages are in one folder.
- The circular “JB” mark is a placeholder monogram, not an official school logo.
- The navigation uses the supplied school contact details and a responsive mobile menu.
- If a page is not created yet (for example gallery.html or contact.html), its link
  will work once you add that page.
