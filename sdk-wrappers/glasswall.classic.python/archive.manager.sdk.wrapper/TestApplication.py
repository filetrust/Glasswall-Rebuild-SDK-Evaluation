import argparse
import sys


def parseArgs(parser):

    try:

        parser.parse_args()

        args = parser.parse_args()

        if str(args.InputDirectory) != 'None':

            inputDir = str(args.InputDirectory)
        else:
            print('No input directory given.\n')

            parser.print_help()

            sys.exit()

        if str(args.OutputDirectory) != 'None':

            outputDir = str(args.OutputDirectory)
        else:
            print('No output directory given.\n')

            parser.print_help()

            sys.exit()

        if str(args.ContentManagementConfig) != 'None':

            cmConfig = str(args.ContentManagementConfig)
        else:
            print('Path to XML content management config file required.\n')

            parser.print_help()

            sys.exit()

        if str(args.Library) != 'None':

            library = str(args.Library)
        else:
            print('Path to archive manager library required.\n')

            parser.print_help()

            sys.exit()

    except Exception:

        print('Invalid args.\n')

        parser.print_help()

        sys.exit()

    return inputDir, outputDir, cmConfig, library


def getCommandLineArgs():

    parser = argparse.ArgumentParser()

    parser.add_argument("-i,",
                        dest="InputDirectory",
                        help="[Required] Input directory.",
                        type=str)

    parser.add_argument("-o,",
                        dest="OutputDirectory",
                        help="[Required] Output directory.",
                        type=str)

    parser.add_argument("-c,",
                        dest="ContentManagementConfig",
                        help="[Required] Path to content management config file.",
                        type=str)

    parser.add_argument("-l,",
                        dest="Library",
                        help="[Required] Path to archive manager library.",
                        type=str)

    return parseArgs(parser)


def getFiles(inDirectory):
    """
        Reads files from given directory
    """

    listOfFiles = list()
    from os import walk, path
    for root, subFolders, files in walk(u"" + inDirectory):
        for eachFile in files:
            listOfFiles.append(path.join(root, eachFile))

    return listOfFiles


def loadGwArchiveLib(libraryPath):
    from GlasswallArchiveManager import ArchiveManager
    return ArchiveManager(libraryPath)


def writeBinaryFile(content, path):

    if content is not None:
        with open(path, "wb") as f:
            f.write(content)
    else:
        print("Warning: No binary content to write!")


def main():

    inputDirectory, outputDirectory, contentManagementPolicyFile, pathToLib = getCommandLineArgs()
    inputFiles = getFiles(inputDirectory)
    print (pathToLib)
    gw = loadGwArchiveLib(pathToLib)

    from os import path, mkdir
    if not path.isdir(outputDirectory):
        mkdir(outputDirectory)

    with open(contentManagementPolicyFile, "rb") as f:
            configFileStream = f.read()

    for eachFile in inputFiles:

        print("Info: Processing file " + eachFile)

        with open(eachFile, "rb") as f:
            inputFileStream = f.read()

        protect_result = gw.GwFileProtectAndReportArchive(inputFileStream, configFileStream)
        
        if protect_result.returnStatus == 1:
            print("Info: Writing protect mode output")
            outputFilePath = path.join(outputDirectory, "protect_" + path.basename(eachFile))
            writeBinaryFile(protect_result.fileBuffer, outputFilePath)
        else:
            print("Warning: Protect mode failure status returned")

        analysis_result = gw.GwFileAnalysisArchive(inputFileStream, configFileStream)

        if analysis_result.returnStatus == 1:
            print("Info: Writing analysis mode output")
            outputFilePath = path.join(outputDirectory, "analysis_" + path.basename(eachFile))
            writeBinaryFile(analysis_result.fileBuffer, outputFilePath)
        else:
            print("Warning: Analysis mode failure status returned")

if __name__ == "__main__":
    main()
