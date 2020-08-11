// Glasswall Library JavaScript Wrapper

/**
 * A JavaScript API wrapper around the Glasswall library.
 */
class Glasswall
{
    /**************************************************************************************************
     * Typedefs
     *************************************************************************************************/

    /**
     * @typedef {Object} GWFileConfigGetResult
     * @property {number} status The status of the call.
     * @property {string} xmlString The current XML content management configuration.
     */

    /**
     * @typedef {Object} GWGetIdInfoResult
     * @property {number} status The status of the call.
     * @property {string} string The Issue ID group description.
     */

    /**
     * @typedef {Object} GWGetAllIdInfoResult
     * @property {number} status The status of the call.
     * @property {string} xmlString XML document containing the issue ID ranges along with their corresponding group descriptions.
     */

    /**
     * @typedef {Object} GWFileBufferResult
     * @property {number} status The file process status.
     * @property {Buffer} fileBuffer The resulting file buffer.
     */

    /**
     * @typedef {Object} GWFileBufferWithReportResult
     * @property {number} status The file process status.
     * @property {Buffer} fileBuffer The resulting file buffer.
     * @property {Buffer} report The engineering report.
     */

    /**
     * @typedef {Object} GWFileAnalysisResult
     * @property {number} status The status of the call.
     * @property {string} xmlReport The XML analysis report.
     */

    /**
     * @typedef {Object} GWFileAnalysisWithReportResult
     * @property {number} status The status of the call.
     * @property {string} xmlReport The XML analysis report.
     * @property {Buffer} report The engineering report.
     */

    /**
     * @typedef {Object} GWMemoryToMemoryProtectResult
     * @property {number} status The status of the call.
     * @property {Buffer} fileBuffer The resulting file buffer.
     */

    /**
     * @typedef {Object} GWMemoryToMemoryAnalysisAuditResult
     * @property {number} status The status of the call.
     * @property {string} xmlReport The XML analysis report.
     */

    /**
     * @typedef {Object} GWFileProcessStatusResult
     * @property {number} status The status of the call.
     * @property {number} glasswallProcessStatus The process status.
     */

    /**
     * @typedef {Object} GWDetermineFileTypeResult
     * @property {number} determinedFileType The value indicating the determined file type.
     * @property {Buffer} xmlReport The analysis XML report describing how the file type was determined. This will only exist when the determine file type with Report API is called. 
     */

    /**
     * Represents a Glasswall library object.
     * @param {string} pathToLibrary The path to the Glasswall library.
     */
    constructor(pathToLibrary)
    {
        // Import JavaScript libraries
        let ffi      = require('ffi');
        this.ref     = require('ref');
        this.wchar_t = require('ref-wchar');

        // API Binding
        this.wchar_str     = this.wchar_t.string;
        this.uint_ptr      = this.ref.refType(this.ref.types.uint);
        this.size_t        = this.ref.types.size_t;
        this.size_t_ptr    = this.ref.refType(this.ref.types.size_t);
        this.wchar_str_ptr = this.ref.refType(this.wchar_str);
        this.void_ptr      = this.ref.refType(this.ref.types.void);
        this.void_ptr_ptr  = this.ref.refType(this.ref.refType(this.ref.types.void));

        let declarations = {

            // Configuration and Library information API functions
            'GWFileVersion': [this.wchar_str, []],
            'GWFileConfigRevertToDefaults': ['int', []],
            'GWFileConfigXML': ['int', [this.wchar_str]],
            'GWFileConfigGet': ['int', [this.wchar_str_ptr, this.size_t_ptr]],

            // Issue ID information API functions
            'GWGetAllIdInfo': ['int', [this.size_t_ptr, this.void_ptr_ptr]],
            'GWGetIdInfo': ['int', ['uint32', this.size_t_ptr, this.void_ptr_ptr]],

            // Glasswall Document Processing - File to Memory Location
            'GWFileProtect': ['int', [this.wchar_str, this.wchar_str, this.void_ptr_ptr, this.size_t_ptr]],
            'GWFileToMemoryProtectAndImport': ['int', [this.wchar_str, this.void_ptr_ptr, this.size_t_ptr]],
            'GWFileToMemoryAnalysisProtectAndExport': ['int', [this.wchar_str, this.void_ptr_ptr, this.size_t_ptr]],
            'GWFileProtectLiteAndReport': ['int', [this.wchar_str, this.wchar_str, this.void_ptr_ptr, this.size_t_ptr,
                this.void_ptr_ptr, this.size_t_ptr]],
            'GWFileProtectAndReport': ['int', [this.wchar_str, this.wchar_str, this.void_ptr_ptr, this.size_t_ptr,
                this.void_ptr_ptr, this.size_t_ptr]],
            'GWFileProtectLite': ['int', [this.wchar_str, this.wchar_str, this.void_ptr_ptr, this.size_t_ptr]],
            'GWFileAnalysisAudit': ['int', [this.wchar_str, this.wchar_str, this.void_ptr_ptr, this.size_t_ptr]],
            'GWFileAnalysisAuditAndReport': ['int', [this.wchar_str, this.wchar_str, this.void_ptr_ptr,
                this.size_t_ptr, this.void_ptr_ptr, this.size_t_ptr]],
            
            // Glasswall Document Processing - File to File
            'GWFileToFileAnalysisAuditAndReport': ['int', [this.wchar_str, this.wchar_str, this.wchar_str, this.wchar_str]],
            'GWFileToFileProtectLiteAndReport': ['int', [this.wchar_str, this.wchar_str, this.wchar_str, this.wchar_str]],
            'GWFileToFileProtectAndReport': ['int', [this.wchar_str, this.wchar_str, this.wchar_str, this.wchar_str]],
            'GWFileToFileAnalysisAudit': ['int', [this.wchar_str, this.wchar_str, this.wchar_str]],
            'GWFileToFileProtectLite': ['int', [this.wchar_str, this.wchar_str, this.wchar_str]],
            'GWFileToFileAnalysisProtectAndExport': ['int', [this.wchar_str, this.wchar_str]],
            'GWFileToFileProtect': ['int', [this.wchar_str, this.wchar_str, this.wchar_str]],
            'GWFileToFileProtectAndImport': ['int', [this.wchar_str, this.wchar_str]],

            // Glasswall Document Processing - Memory to Memory
            'GWMemoryToMemoryProtect': ['int', [this.void_ptr, this.size_t, this.wchar_str, this.void_ptr_ptr, this.size_t_ptr]],
            'GWMemoryToMemoryAnalysisAudit': ['int', [this.void_ptr, this.size_t, this.wchar_str, this.void_ptr_ptr, this.size_t_ptr]],

            // Glasswall Document Processing - Supporting Functions
            'GWDetermineFileTypeFromFile': ['int', [this.wchar_str]],
            'GWDetermineFileTypeFromFileAndReport': ['int', [this.wchar_str, this.void_ptr_ptr, this.size_t_ptr]],
            'GWDetermineFileTypeFromFileInMem': ['int', [this.void_ptr, this.size_t]],
            'GWDetermineFileTypeFromFileInMemAndReport': ['int', [this.void_ptr, this.size_t, this.void_ptr_ptr, this.size_t_ptr]],

            // Glasswall Document Processing Results
            'GWFileProcessStatus': ['int', [this.uint_ptr]],
            'GWFileProcessMsg': [this.wchar_str, []],
            'GWFileErrorMsg': [this.wchar_str, []],

            // Glasswall Resource Management API functions
            'GWFileDone': ['int', []]
        };

        // Load Glasswall Library
        this.gw = ffi.Library(pathToLibrary, declarations);
    }

    /**
     * Returns the Glasswall library version.
     * @returns {string} The Glasswall library version.
     */
    GWFileVersion()
    {
        return this.gw.GWFileVersion();
    }

    /**
     * Applies the given XML content management configuration to the Glasswall library.
     * @param {string} xmlConfigString The XML content management configuration.
     * @returns {number} The status of the call.
     */
    GWFileConfigXML(xmlConfigString)
    {
        return this.gw.GWFileConfigXML(xmlConfigString);
    }

    /**
     * Retrieves the current XML content management configuration from the Glasswall library.
     * @returns {GWFileConfigGetResult} A result indicating the status of the call along with the XML content management configuration.
     */
    GWFileConfigGet()
    {
        let size = this.ref.alloc('size_t', 0);
        let buffer = this.ref.alloc(this.wchar_str);

        let status = this.gw.GWFileConfigGet(buffer, size);

        let content;
        if (!buffer.isNull()){
            content = Buffer.from(buffer.deref(), size.deref()).toString();
        }

        return {
            status: status,
            xmlString: content
        };
    }

    /**
     * Reverts the content management settings to their defaults, which are described in the Glasswall SDK documentation.
     * @returns {number} The status of the call.
     */
    GWFileConfigRevertToDefaults()
    {
        return this.gw.GWFileConfigRevertToDefaults();
    }

    /**
     * Retrieves the group description for the given Issue ID.
     * @param {number} issueId The issue ID to lookup.
     * @returns {GWGetIdInfoResult} A result indicating the status of the call along with the Issue ID group description.
     */
    GWGetIdInfo(issueId)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWGetIdInfo(issueId, buffSize, fileBuffer);

        let content;
        if ( (!fileBuffer.isNull()) && buffSize.deref() > 0){
            content = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            ).toString();
        }

        return {
            status: status,
            string: content
        }
    }

    /**
     * Retrieves the XML containing all the Issue ID ranges with their group descriptions.
     * @returns {GWGetAllIdInfoResult} A result indicating the status of the call along with all of the Issue ID information.
     */
    GWGetAllIdInfo()
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWGetAllIdInfo(buffSize, fileBuffer);

        let content;
        if ( (!fileBuffer.isNull()) && buffSize.deref() > 0) {
            content = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            ).toString();
        }

        return {
            status: status,
            xmlString: content
        }
    }

    /**
     * Releases any resources allocated by the Glasswall library. This is normally called once all the processing is done and Glasswall is not required anymore.
     * @returns {number} The status of the call.
     */
    GWFileDone()
    {
        return this.gw.GWFileDone();
    }

    /**
     * Protects the file in File to Memory Protect mode.
     * @param {string} filePath The file path to the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @returns {GWFileBufferResult} A result indicating the file process status along with the protected file. The file buffer will be undefined if the file is non-conforming.
     */
    GWFileProtect(filePath, fileType)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWFileProtect(filePath, fileType, fileBuffer, buffSize);

        let content;
        if (status === 1 && (!fileBuffer.isNull()) ){
            content = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            );
        }

        return {
            status: status,
            fileBuffer: content
        }
    }

    /**
     * Exports the file in File to Memory Export mode.
     * @param {string} filePath The file path to the file to be processed.
     * @returns {GWFileBufferResult} A result indicating the file process status along with the exported archive.
     */
    GWFileToMemoryAnalysisProtectAndExport(filePath)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWFileToMemoryAnalysisProtectAndExport(filePath, fileBuffer, buffSize);

        let content;
        if ( (!fileBuffer.isNull()) && buffSize.deref() > 0){
            content = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            );
        }

        return {
            status: status,
            fileBuffer: content
        }
    }

    /**
     * Imports the exported archive in File to Memory Import mode.
     * @param {string} filePath The file path to the exported file archive.
     * @returns {GWFileBufferResult} A result indicating the file process status along with the imported file. The file buffer will be undefined if the file is non-conforming.
     */
    GWFileToMemoryProtectAndImport(filePath)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWFileToMemoryProtectAndImport(filePath, fileBuffer, buffSize);

        let content;
        if (status === 1 && (!fileBuffer.isNull())){
            content = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            );
        }
        
        return {
            status: status,
            fileBuffer: content
        }
    }

    /**
     * Protects the file in File to Memory Protect Lite with engineering report mode.
     * @param {string} filePath The file path to the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @returns {GWFileBufferWithReportResult} A result indicating the file process status along with the protected file and the engineering report. The file buffer will be undefined if the file is non-conforming.
     */
    GWFileProtectLiteAndReport(filePath, fileType)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let reportBuffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);
        let reportBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWFileProtectLiteAndReport(filePath, fileType, fileBuffer, buffSize, reportBuffer,
            reportBuffSize);

        let fileContent;
        if (status === 1 && (!fileBuffer.isNull())){
            fileContent = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            );
        }

        let reportContent;
        if ( (!reportBuffer.isNull()) && reportBuffSize.deref() > 0){
            reportContent = Buffer.from(
                this.ref.reinterpret(reportBuffer.deref(), reportBuffSize.deref(), 0)
            );
        }

        return {
            status: status,
            fileBuffer: fileContent,
            report: reportContent
        }
    }

    /**
     * Protects the file in File to Memory Protect with engineering report mode.
     * @param {string} filePath The file path to the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @returns {GWFileBufferWithReportResult} A result indicating the file process status along with the protected file and the engineering report. The file buffer will be undefined if the file is non-conforming.
     */
    GWFileProtectAndReport(filePath, fileType)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let reportBuffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);
        let reportBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWFileProtectAndReport(filePath, fileType, fileBuffer, buffSize, reportBuffer,
            reportBuffSize);

        let fileContent;
        if (status === 1 && (!fileBuffer.isNull())){
            fileContent = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            );
        }

        let reportContent;
        if ( (!reportBuffer.isNull()) && reportBuffSize.deref() > 0){
            reportContent = Buffer.from(
                this.ref.reinterpret(reportBuffer.deref(), reportBuffSize.deref(), 0)
            );
        }

        return {
            status: status,
            fileBuffer: fileContent,
            report: reportContent
        }
    }

    /**
     * Protects the file in File to Memory Protect Lite mode.
     * @param {string} filePath The file path to the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @returns {GWFileBufferResult} A result indicating the file process status along with the protected file. The file buffer will be undefined if the file is non-conforming.
     */
    GWFileProtectLite(filePath, fileType)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWFileProtectLite(filePath, fileType, fileBuffer, buffSize);

        let content;
        if (status === 1 && (!fileBuffer.isNull())){
            content = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            );
        }

        return {
            status: status,
            fileBuffer: content
        }
    }

    /**
     * Analyses the file in File to Memory Analysis mode.
     * @param {string} filePath The file path to the file to be analysed.
     * @param {string} fileType The file type of the file to be analysed.
     * @returns {GWFileAnalysisResult} A result indicating the file process status along with the XML analysis report.
     */
    GWFileAnalysisAudit(filePath, fileType)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWFileAnalysisAudit(filePath, fileType, fileBuffer, buffSize);

        let content;
        if ( (!fileBuffer.isNull()) && buffSize.deref() > 0 ){
            content = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0) 
            ).toString();
        }

        return {
            status: status,
            xmlReport: content
        }
    }

    /**
     * Analyses the file in File to Memory Analysis with engineering report mode.
     * @param {string} filePath The file path to the file to be analysed.
     * @param {string} fileType The file type of the file to be analysed.
     * @returns {GWFileAnalysisWithReportResult} A result indicating the file process status along with the XML analysis report and the engineering report.
     */
    GWFileAnalysisAuditAndReport(filePath, fileType)
    {
        let buffSize = this.ref.alloc('size_t', 0);
        let reportBuffSize = this.ref.alloc('size_t', 0);

        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);
        let reportBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status = this.gw.GWFileAnalysisAuditAndReport(filePath, fileType, fileBuffer, buffSize, reportBuffer,
            reportBuffSize);

        let analysisFileContent;
        if ( (!fileBuffer.isNull()) && buffSize.deref() > 0){
            analysisFileContent = Buffer.from(
                this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)
            ).toString();
        }

        let reportContent;
        if ( (!reportBuffer.isNull()) && reportBuffSize.deref() > 0){
            reportContent = Buffer.from(
                this.ref.reinterpret(reportBuffer.deref(), reportBuffSize.deref(), 0)
            );
        }

        return {
            status: status,
            xmlReport: analysisFileContent,
            report: reportContent
        }
    }

    /**
     * Exports the file in File to File Export mode. The exported archive will not be created if the output directory does not exist.
     * @param {string} inputFilePath The file path to the file to be processed.
     * @param {string} outputFilePath The output file path to the exported archive.
     * @returns {number} The file process status.
     */
    GWFileToFileAnalysisProtectAndExport(inputFilePath, outputFilePath)
    {
        return this.gw.GWFileToFileAnalysisProtectAndExport(inputFilePath, outputFilePath);
    }

    /**
     * Imports the exported archive in File to File Import mode. The imported file will not be created if the output directory does not exist or the file is non-conforming.
     * @param {string} inputFilePath The file path to the exported file archive.
     * @param {string} outputFilePath The output file path to the imported file.
     * @returns {number} The file process status.
     */
    GWFileToFileProtectAndImport(inputFilePath, outputFilePath)
    {
        return this.gw.GWFileToFileProtectAndImport(inputFilePath, outputFilePath);
    }

    /**
     * Protects the file in File to File Protect Lite mode. The managed file will not be created if the output directory does not exist or if the file is non-conforming.
     * @param {string} inputFilePath The file path to the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @param {string} outputFilePath The output file path to the managed file.
     * @returns {number} The file process status.
     */
    GWFileToFileProtectLite(inputFilePath, fileType, outputFilePath)
    {
        return this.gw.GWFileToFileProtectLite(inputFilePath, fileType, outputFilePath);
    }

    /**
     * Protects the file in File to File Protect mode. The managed file will not be created if the output directory does not exist or if the file is non-conforming.
     * @param {string} inputFilePath The file path to the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @param {string} outputFilePath The output file path to the managed file.
     * @returns {number} The file process status.
     */
    GWFileToFileProtect(inputFilePath, fileType, outputFilePath)
    {
        return this.gw.GWFileToFileProtect(inputFilePath, fileType, outputFilePath);
    }

    /**
     * Analyses the file in File to File Analysis mode. The XML analysis report will not be created if the output directory does not exist.
     * @param {string} inputFilePath The file path to the file to be analysed.
     * @param {string} fileType The file type of the file to be analysed.
     * @param {string} outputFilePath The output file path to the XML analysis report.
     * @returns {number} The file process status.
     */
    GWFileToFileAnalysisAudit(inputFilePath, fileType, outputFilePath)
    {
        return this.gw.GWFileToFileAnalysisAudit(inputFilePath, fileType, outputFilePath);
    }

    /**
     * Protects the file in File to File Protect Lite with engineering report mode. The managed file will not be created if the output directory does not exist or the file is non-conforming. The engineering report will not be created if the output directory does not exist.
     * @param {string} inputFilePath The file path to the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @param {string} outputFilePath The output file path to the managed file.
     * @param {string} reportFilePath The output file path to the engineering report.
     * @returns {number} The file process status.
     */
    GWFileToFileProtectLiteAndReport(inputFilePath, fileType, outputFilePath, reportFilePath)
    {
        return this.gw.GWFileToFileProtectLiteAndReport(inputFilePath, fileType, outputFilePath, reportFilePath);
    }

    /**
     * Protects the file in File to File Protect with engineering report mode. The managed file will not be created if the output directory does not exist or the file is non-conforming. The engineering report will not be created if the output directory does not exist.
     * @param {string} inputFilePath The file path to the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @param {string} outputFilePath The output file path to the managed file.
     * @param {string} reportFilePath The output file path to the engineering report.
     * @returns {number} The file process status.
     */
    GWFileToFileProtectAndReport(inputFilePath, fileType, outputFilePath, reportFilePath)
    {
        return this.gw.GWFileToFileProtectAndReport(inputFilePath, fileType, outputFilePath, reportFilePath);
    }

    /**
     * Analyses the file in File to File Analysis with engineering report mode. The XML analysis report will not be created if the output directory does not exist. The engineering report will not be created if the output directory does not exist.
     * @param {string} inputFilePath The file path to the file to be analysed.
     * @param {string} fileType The file type of the file to be analysed.
     * @param {string} outputFilePath The output file path to the XML analysis report.
     * @param {string} reportFilePath The output file path to the engineering report.
     * @returns {number} The file process status.
     */
    GWFileToFileAnalysisAuditAndReport(inputFilePath, fileType, outputFilePath, reportFilePath)
    {
        return this.gw.GWFileToFileAnalysisAuditAndReport(inputFilePath, fileType, outputFilePath, reportFilePath);
    }

    /**
     * Protects the file in Memory to Memory Protect mode. 
     * @param {Buffer} inputFileBuffer The buffer containing the file to be processed.
     * @param {string} fileType The file type of the file to be processed.
     * @return {GWMemoryToMemoryProtectResult} A result indicating the file process status along with the protected file. The file buffer will be undefined if the file is non-conforming.
     */
    GWMemoryToMemoryProtect(inputFileBuffer, fileType)
    {
        let buffSize   = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status     = this.gw.GWMemoryToMemoryProtect(inputFileBuffer, inputFileBuffer.length, fileType, fileBuffer, buffSize);

        let content;

        if (status === 1 && !fileBuffer.isNull()) {
            content = Buffer.from(this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0));
        }

        return {
            status: status,
            fileBuffer: content
        }
    }

    /**
     * Analyses the file in Memory to Memory Analysis mode.
     * @param {Buffer} inputFileBuffer The buffer containing the file to be analysed.
     * @param {string} fileType The file type of the file to be analysed.
     * @return {GWMemoryToMemoryAnalysisAuditResult} A result indicating the file process status along with the XML analysis report.
     */
    GWMemoryToMemoryAnalysisAudit(inputFileBuffer, fileType) {
        let buffSize   = this.ref.alloc('size_t', 0);
        let fileBuffer = this.ref.alloc(this.void_ptr_ptr);

        let status     = this.gw.GWMemoryToMemoryAnalysisAudit(inputFileBuffer, inputFileBuffer.length, fileType, fileBuffer, buffSize);

        let content;

        if (!fileBuffer.isNull() && buffSize.deref() > 0) {
            content = Buffer.from(this.ref.reinterpret(fileBuffer.deref(), buffSize.deref(), 0)).toString();
        }

        return {
            status: status,
            xmlReport: content
        }
    }

    /**
     * Returns a result with the file type determined by Glasswall.
     * @param {string} inputFilePath The file path to the input file.
     * @returns {GWDetermineFileTypeResult} The result containing the determined file type.
     */
    GWDetermineFileTypeFromFile(inputFilePath)
    {
        let result = this.gw.GWDetermineFileTypeFromFile(inputFilePath);

        return {
            determinedFileType: result,
            xmlReport: undefined
        }
    }

    /**
     * Returns a result with the file type determined by Glasswall along with an XML analysis report.
     * @param {string} inputFilePath The file path to the input file.
     * @returns {GWDetermineFileTypeResult} The result containing the determined file type along with an XML analysis report.
     */
    GWDetermineFileTypeFromFileAndReport(inputFilePath)
    {
        let analysisBuffer = this.ref.alloc(this.void_ptr_ptr);
        let buffSize       = this.ref.alloc('size_t', 0);

        let result = this.gw.GWDetermineFileTypeFromFileAndReport(inputFilePath, analysisBuffer, buffSize);

        let content;

        if (!analysisBuffer.isNull() && buffSize.deref() > 0) {
            content = Buffer.from(this.ref.reinterpret(analysisBuffer.deref(), buffSize.deref(), 0)).toString()
        }

        return {
            determinedFileType: result,
            xmlReport: content
        }
    }

    /**
     * Returns a result with the file type determined by Glasswall.
     * @param {Buffer} inputFileBuffer The input buffer containing the file to be determined.
     * @returns {GWDetermineFileTypeResult} The result containing the determined file type.
     */
    GWDetermineFileTypeFromFileInMem(inputFileBuffer)
    {
        let result = this.gw.GWDetermineFileTypeFromFileInMem(inputFileBuffer, inputFileBuffer.length);

        return {
            determinedFileType: result,
            xmlReport: undefined
        }
    }

    /**
     * Returns a result with the file type determined by Glasswall along with an XML analysis report.
     * @param {Buffer} inputFileBuffer The input buffer containing the file to be determined.
     * @returns {GWDetermineFileTypeResult} The result containing the determined file type along with an XML analysis report.
     */
    GWDetermineFileTypeFromFileInMemAndReport(inputFileBuffer)
    {
        let analysisBuffer = this.ref.alloc(this.void_ptr_ptr);
        let buffSize       = this.ref.alloc('size_t', 0);

        let result = this.gw.GWDetermineFileTypeFromFileInMemAndReport(inputFileBuffer, inputFileBuffer.length, analysisBuffer, buffSize);

        let content;

        if (!analysisBuffer.isNull() && buffSize.deref() > 0) {
            content = Buffer.from(this.ref.reinterpret(analysisBuffer.deref(), buffSize.deref(), 0)).toString()
        }

        return {
            determinedFileType: result,
            xmlReport: content
        }
    }

    /**
     * Returns the file process message from the previous call made to Glasswall.
     * @returns {string} The file process message.
     */
    GWFileProcessMsg()
    {
        return this.gw.GWFileProcessMsg();
    }

    /**
     * Retrieves the process status from the previous call made to Glasswall.
     * @return {GWFileProcessStatusResult} A result indicating the status of the call along with the process status.
     */
    GWFileProcessStatus()
    {
        let processStatus = this.ref.alloc('uint', 0);
        let status = this.gw.GWFileProcessStatus(processStatus);

        let glasswallProcessStatus;
        if( (!processStatus.isNull()) && status === 1){
            glasswallProcessStatus = processStatus.deref();
        }

        return {
            status: status,
            glasswallProcessStatus: glasswallProcessStatus
        }
    }

    /**
     * Returns the file error message from the previous call made to Glasswall.
     * @returns {string} The file error message.
     */
    GWFileErrorMsg()
    {
        return this.gw.GWFileErrorMsg();
    }
}

module.exports = Glasswall