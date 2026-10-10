# RTFD to PDF Converter

This folder contains a tiny macOS-native converter for the note bundles in `data/notes`.
It uses AppKit to read `.rtfd` packages, including their embedded image attachments, and saves PDFs.

Run from the repository root:

```sh
data/notes/viewer_script/convert_rtfd_to_pdf.sh
```

By default, PDFs are written to:

```text
data/notes/pdf/
```

You can also pass explicit input and output directories:

```sh
data/notes/viewer_script/convert_rtfd_to_pdf.sh data/notes /tmp/notes-pdf
```

The generated PDFs can be displayed directly in the browser with an `<iframe>` or `<embed>`.
