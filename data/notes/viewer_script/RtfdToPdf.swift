import AppKit
import Foundation

enum ConverterError: Error, CustomStringConvertible {
    case unsupportedInput(URL)
    case unableToReadInput(URL)
    case unableToCreateAttributedString(URL)
    case unableToWritePDF(URL)

    var description: String {
        switch self {
        case .unsupportedInput(let url):
            return "Unsupported input file: \(url.path)"
        case .unableToReadInput(let url):
            return "Unable to read input file: \(url.path)"
        case .unableToCreateAttributedString(let url):
            return "Unable to create attributed string from input file: \(url.path)"
        case .unableToWritePDF(let url):
            return "Unable to write PDF: \(url.path)"
        }
    }
}

struct ConversionOptions {
    var paperSize = NSSize(width: 595.2, height: 841.8) // A4, in PostScript points.
    var margin: CGFloat = 10
    var scale: CGFloat = 0.80
}

struct RtfdToPdfConverter {
    let options: ConversionOptions

    func convert(inputURL: URL, outputURL: URL) throws {
        let attributedString = try attributedString(from: inputURL)

        try FileManager.default.createDirectory(
            at: outputURL.deletingLastPathComponent(),
            withIntermediateDirectories: true
        )

        let printableWidth = options.paperSize.width - options.margin * 2
        let textView = NSTextView(frame: NSRect(x: 0, y: 0, width: printableWidth, height: 0))
        textView.isEditable = false
        textView.isSelectable = false
        textView.isRichText = true
        textView.isHorizontallyResizable = false
        textView.isVerticallyResizable = true
        textView.minSize = NSSize(width: printableWidth, height: 0)
        textView.maxSize = NSSize(width: printableWidth, height: CGFloat.greatestFiniteMagnitude)
        textView.textContainer?.containerSize = NSSize(
            width: printableWidth,
            height: CGFloat.greatestFiniteMagnitude
        )
        textView.textContainer?.widthTracksTextView = true
        textView.textStorage?.setAttributedString(attributedString)
        textView.layoutManager?.ensureLayout(for: textView.textContainer!)

        if let textContainer = textView.textContainer, let layoutManager = textView.layoutManager {
            let usedRect = layoutManager.usedRect(for: textContainer)
            textView.frame.size.height = max(usedRect.height + options.margin, options.paperSize.height)
        }

        let printInfo = NSPrintInfo()
        printInfo.paperSize = options.paperSize
        printInfo.leftMargin = options.margin
        printInfo.rightMargin = options.margin
        printInfo.topMargin = options.margin
        printInfo.bottomMargin = options.margin
        printInfo.isHorizontallyCentered = false
        printInfo.isVerticallyCentered = false
        printInfo.scalingFactor = options.scale
        printInfo.jobDisposition = .save
        printInfo.dictionary()[NSPrintInfo.AttributeKey.jobSavingURL] = outputURL as NSURL

        let operation = NSPrintOperation(view: textView, printInfo: printInfo)
        operation.showsPrintPanel = false
        operation.showsProgressPanel = false

        guard operation.run() else {
            throw ConverterError.unableToWritePDF(outputURL)
        }
    }

    private func attributedString(from inputURL: URL) throws -> NSAttributedString {
        if inputURL.pathExtension.caseInsensitiveCompare("rtfd") == .orderedSame {
            let fileWrapper = try rtfdFileWrapper(from: inputURL)

            guard let attributedString = NSAttributedString(
                rtfdFileWrapper: fileWrapper,
                documentAttributes: nil
            ) else {
                throw ConverterError.unableToCreateAttributedString(inputURL)
            }

            return attributedString
        }

        if inputURL.pathExtension.caseInsensitiveCompare("rtf") == .orderedSame {
            return try NSAttributedString(
                url: inputURL,
                options: [.documentType: NSAttributedString.DocumentType.rtf],
                documentAttributes: nil
            )
        }

        throw ConverterError.unsupportedInput(inputURL)
    }

    private func rtfdFileWrapper(from inputURL: URL) throws -> FileWrapper {
        let children = try FileManager.default.contentsOfDirectory(
            at: inputURL,
            includingPropertiesForKeys: [.isRegularFileKey],
            options: [.skipsHiddenFiles]
        )

        var wrappers: [String: FileWrapper] = [:]
        for childURL in children {
            let values = try childURL.resourceValues(forKeys: [.isRegularFileKey])
            guard values.isRegularFile == true else {
                continue
            }

            let wrapper = FileWrapper(regularFileWithContents: try Data(contentsOf: childURL))
            let filename = childURL.lastPathComponent
            wrapper.preferredFilename = filename
            wrappers[filename] = wrapper
        }

        guard wrappers["TXT.rtf"] != nil else {
            throw ConverterError.unableToReadInput(inputURL)
        }

        let directoryWrapper = FileWrapper(directoryWithFileWrappers: wrappers)
        directoryWrapper.preferredFilename = inputURL.lastPathComponent
        return directoryWrapper
    }
}

func isConvertibleFile(_ url: URL) -> Bool {
    url.pathExtension.caseInsensitiveCompare("rtf") == .orderedSame
        || url.pathExtension.caseInsensitiveCompare("rtfd") == .orderedSame
}

func printUsage() {
    let executable = URL(fileURLWithPath: CommandLine.arguments[0]).lastPathComponent
    print("""
    Usage:
      \(executable) [input-rtf-or-rtfd] [output-pdf]
    """)
}

let arguments = Array(CommandLine.arguments.dropFirst())

if arguments.contains("--help") || arguments.contains("-h") {
    printUsage()
    exit(0)
}

let currentDirectory = URL(fileURLWithPath: FileManager.default.currentDirectoryPath, isDirectory: true)
let inputURL = arguments.first.map { URL(fileURLWithPath: $0) } ?? currentDirectory
let outputURL = arguments.dropFirst().first.map { URL(fileURLWithPath: $0) }

do {
    guard isConvertibleFile(inputURL) else {
        throw ConverterError.unsupportedInput(inputURL)
    }
    let converter = RtfdToPdfConverter(options: ConversionOptions())
    let pdfURL = outputURL ?? inputURL.deletingPathExtension().appendingPathExtension("pdf")
    try converter.convert(inputURL: inputURL, outputURL: pdfURL)
    print("\(inputURL.lastPathComponent) -> \(pdfURL.path)")
} catch {
    fputs("rtfd-to-pdf: \(error)\n", stderr)
    exit(1)
}
